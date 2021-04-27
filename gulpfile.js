const {src, dest, task, series, parallel, watch} = require('gulp');

const BUILD_FOLDER = 'build';
const SOURCE_FOLDER = 'src';

const PATH = {
  src: {
    html: [
      SOURCE_FOLDER + '/**/*.html',
      '!' + SOURCE_FOLDER + 'html-blocks/*'],
    scss: [
      'node_modules/normalize.css/normalize.css',
      SOURCE_FOLDER + '/styles/main.scss',
    ],
    js: SOURCE_FOLDER + '/js/**/*',
    img: SOURCE_FOLDER + '/img/**/*',
    fonts: SOURCE_FOLDER + '/fonts/*.ttf',

  },
  clean: './' + BUILD_FOLDER + '/',
  build: {
    html: BUILD_FOLDER + '/',
    css: BUILD_FOLDER + '/styles/',
    js: BUILD_FOLDER + '/js/',
    img: BUILD_FOLDER + '/img/',
    svgIcons: BUILD_FOLDER + '/img/icons',
    fonts: BUILD_FOLDER + '/fonts/',
    favicon: BUILD_FOLDER + '/',
  },
  watch: {
    html: SOURCE_FOLDER + '/**/*.html',
    scss: SOURCE_FOLDER + '/styles/**/*.scss',
    js: SOURCE_FOLDER + '/js/**/*',
    img: SOURCE_FOLDER + '/img/**/*',
  },
};

const packages = {
  gulpRm: require('gulp-rm'),

  fileInclude: require('gulp-file-include'),

  concat: require('gulp-concat'),
  compiler: require('node-sass'),
  sass: require('gulp-sass'),
  sassGlob: require('gulp-sass-glob'),
  autoPrefix: require('gulp-autoprefixer'),
  cleanCSS: require('gulp-clean-css'),
  sourcemaps: require('gulp-sourcemaps'),
  groupMedia:  require('gulp-group-css-media-queries'),
  gulpRename: require('gulp-rename'),

  gulpMinJs: require('gulp-uglify-es').default,
  babel: require('gulp-babel'),
  webpack: require('webpack'),
  gulpUtil: require('gulp-util'),
  notifier: require('node-notifier'),

  imgMin: require('gulp-image'),
  svgo: require('gulp-svgo'),

  ttf2woff: require('gulp-ttf2woff'),
  ttf2woff2: require('gulp-ttf2woff2'),
  fonter: require('gulp-fonter'),
  fileSystem: require('fs'),

  gulpif: require('gulp-if'),

  browserSync: require('browser-sync').create(),
};

const webpackConfig = require('./webpack.config');
const statsLog = {
  colors: true,
  reasons: true
};

task('clean', ()=> {
    return src(PATH.clean + '**/*', {read: false})
      .pipe(packages.gulpRm());
});


task('html',()=> {
  return src(PATH.src.html)
    .pipe(packages.fileInclude({
      prefix: '@@',
      basepath: 'src/'
    }))
    .pipe(dest(PATH.build.html))
    .pipe(packages.browserSync.reload({stream: true}));
});

task('images-min', ()=> {
  return src(PATH.src.img)
    .pipe(packages.imgMin())
    .pipe(dest(PATH.build.img))
    .pipe(packages.browserSync.reload({stream: true}));
});


task('fontsTtf2Woff', ()=> {
  src(PATH.src.fonts)
    .pipe(packages.ttf2woff())
    .pipe(dest(PATH.build.fonts));
  return src(PATH.src.fonts)
    .pipe(packages.ttf2woff2())
    .pipe(dest(PATH.build.fonts));
})

task('fontsOtf2Ttf', ()=> {
  return src(SOURCE_FOLDER + '/fonts/*.otf')
    .pipe(packages.fonter({
      formats: ['ttf']
    }))
    .pipe(dest(SOURCE_FOLDER + '/fonts/'))
})

task('copyfonts', () => {
  return src(SOURCE_FOLDER + '/fonts/*.woff*').pipe(dest(PATH.build.fonts));
})

task('webpack', (done) => {
  packages.webpack(webpackConfig, onComplete);

  function onComplete(error, stats) {
    if (error) {
      onError(error);
    } else if ( stats.hasErrors() ) {
      onError( stats.toString(statsLog) );
    } else {
      onSuccess( stats.toString(statsLog) );
    }
  }
  function onError(error) {
    let formatedError = new packages.gulpUtil.PluginError('webpack', error);
    packages.notifier.notify({
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }
  function onSuccess(detailInfo) {
    packages.gulpUtil.log('[webpack]', detailInfo);
    done();
  }
});

task('sassToCss', ()=> {
  return src(PATH.src.scss)
    .pipe(packages.sourcemaps.init())
    .pipe(packages.concat('main.css'))
    .pipe(packages.sassGlob())
    .pipe(packages.sass().on('error', packages.sass.logError))
    .pipe(packages.groupMedia())
    .pipe(packages.autoPrefix({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }))
    .pipe(dest(PATH.build.css))
    .pipe(packages.cleanCSS({compatibility: 'ie8'}))
    .pipe(packages.gulpRename('main.min.css'))
    .pipe(packages.sourcemaps.write())
    .pipe(dest(PATH.build.css))
    .pipe(packages.browserSync.reload({stream: true}));
});

task('sassToCssProd', ()=> {
  return src(PATH.src.scss)
    .pipe(packages.concat('main.css'))
    .pipe(packages.sassGlob())
    .pipe(packages.sass().on('error', packages.sass.logError))
    .pipe(packages.groupMedia())
    .pipe(packages.autoPrefix({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true,
    }))
    .pipe(dest(PATH.build.css))
    .pipe(packages.cleanCSS({compatibility: 'ie8'}))
    .pipe(packages.gulpRename('main.min.css'))
    .pipe(dest(PATH.build.css))
});

task('browserSync', ()=> {
  packages.browserSync.init({
    server: {
      baseDir: "./" + BUILD_FOLDER
    },
    port: 3000,
    open: false
  });
});



task('watch', ()=> {
  watch(PATH.watch.html, series('html'));
  watch(PATH.watch.js, series('webpack'));
  watch(PATH.watch.scss, series('sassToCss'));
  watch(PATH.watch.img, series('images-min'));
});

task('default', series('clean', parallel('images-min', 'html', 'webpack', 'sassToCss'), parallel('watch', 'browserSync')));
task('build', series('clean', parallel('images-min', 'html', 'webpack', 'sassToCssProd'), parallel('watch', 'browserSync')));


