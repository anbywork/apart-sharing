import gql from "graphql-tag";
import {Cities} from "./cities";
import {client} from "../main";

export function setCitiesList() {
  const citiesOptions = {
    query: gql`
        query {
            city {
                data {
                    title,
                    id
                }
            }
        }`,
  };
  client.query(citiesOptions)
    .then((response) => {
      const cities = new Cities(response.data.city.data, 'Москва');
    })
    .catch(error => console.error(error));

}