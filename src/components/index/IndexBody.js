import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Image, Rating } from "semantic-ui-react";
import { getPlaceHolder } from "utils/placeHolder";
import { getList } from "utils/request";
export default class IndexBody extends Component {
  state = {
    filmList: [],
  };

  componentWillMount() {
    let filmList=[]
    getList("/film").then(list=>{
        
       filmList=list
       this.setState({ filmList });
    });

    console.log(filmList)
  }
  render() {

    let { filmList } = this.state;
    const items=[]
    if(filmList===undefined){
      filmList=[]
    }
    filmList.map((data, index) => {
      items.push (
        <Grid.Column textAlign="center">
          <FilmCard
            key={index}
            filmData={data}
          />
        </Grid.Column>
      );
      return null
    })
    return (
      <Grid container columns={4} celled>
        <Grid.Row>
          {items}
        </Grid.Row>
      </Grid>
    );
  }
}

class FilmCard extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.handleOnRate = this.handleOnRate.bind(this);
  }
  handleOnRate(e, { rating, maxRating }) {

  }
  render() {
      const {filmData}=this.props
    return (
      <Card size="large" centered style={{ width: "115px" }}>
        <Link to={"/film/"+filmData.filmId}>
          <Image
            size="big"
            style={{ width: "115px", height: "163px" }}
            src={getPlaceHolder(115,163)}
          ></Image>
          <Card.Content>{filmData.name}</Card.Content>
          {/* {this.props.name} */}
        </Link>
 
      </Card>
    );
  }
}
// "duration": null,
// "actors": null,
// "director": null,
// "filmId": 18,
// "name": "www",
// "rating": null,
// "typeId": 4,
// "type": "what",
// "poster": null,
// "introduction": null,
// "status": "Not released"
