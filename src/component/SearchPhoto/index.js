import React from 'react';
import { Pagination, Input, Row, Col } from 'antd';
import { debounce } from 'lodash';
import './style.css';
import { search } from '../../service/unsplashApi';

class SearchPhoto extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchString: "",
      page: 0,
      data: {
        results: []
      }
    };
  }
  searchPhoto = () => {
    this.setState({ loading: true });
    search(this.state.searchString, this.state.page).then(result => {
      console.log(result.data);
      this.setState({ data: result.data });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  searchPhotoDebounce = debounce(this.searchPhoto, 200);
  handleChangeSearchString = e => {
    this.setState({ searchString: e.currentTarget.value, page: 1 }, this.searchPhotoDebounce);
  }
  handleChangePage = page => {
    this.setState({ page }, this.searchPhoto);
  }
  render() {
    return (
      <div className="search-photo">
        <Input placeholder="Type something to search for image" onChange={this.handleChangeSearchString} />
        {this.state.loading ? <p>Loading...</p> : <Row className="list-photo">
          {this.state.data.results.map(
            photo => <Col key={photo.id} span={6}>
              <a href={photo.links.html} target="_blank">
                <img className="photo" src={photo.urls.thumb} />
              </a>
            </Col>
          )}
        </Row>}
        <Pagination simple current={this.state.page} defaultPageSize={16} total={this.state.data.total} onChange={this.handleChangePage} />
      </div>
    );
  }
}

export default SearchPhoto;
