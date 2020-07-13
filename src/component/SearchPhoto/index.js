import React from 'react';
import { Pagination, Input, Row, Col, Spin } from 'antd';
import { debounce } from 'lodash';
import './style.css';
import { search } from '../../service/unsplashApi';

class SearchPhoto extends React.Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.state = {
      loading: !!urlParams.get('searchString'),
      searchString: urlParams.get('searchString') || "",
      page: urlParams.get('page') || 1,
      data: {
        results: []
      }
    };
  }
  componentWillMount() {
    if (this.state.searchString) {
      this.searchPhoto();
    }
  }
  searchPhoto = () => {
    this.setState({ loading: true });
    window.history.pushState(null, null, `?searchString=${encodeURIComponent(this.state.searchString)}&page=${this.state.page}`);
    search(this.state.searchString, this.state.page).then(result => {
      this.setState({ data: result.data });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }
  searchPhotoDebounce = debounce(this.searchPhoto, 200);
  handleChangeSearchString = e => {
    this.setState({ searchString: e.currentTarget.value, page: 1 }, this.searchPhotoDebounce);
  };
  handleChangePage = page => {
    this.setState({ page }, this.searchPhoto);
  };
  listPhoto = () => (
    <Row style={{ margin: -10 }}>
      {this.state.data.results.map(
        photo => <Col key={photo.id} span={6} style={{ padding: 10 }}>
          <a href={photo.links.html} target="_blank">
            <img className="photo" src={photo.urls.thumb} alt={photo.alt_description}/>
          </a>
        </Col>
      )}
    </Row>
  );
  render() {
    return (
      <div className="search-photo">
        <Input placeholder="Type something to search for image" value={this.state.searchString} onChange={this.handleChangeSearchString} />
        <div  className="list-photo-wrapper">
        {this.state.loading ? <Spin tip="Loading..." delay={100} >
          {this.listPhoto()}
        </Spin> : this.listPhoto()}
        </div>
        <Pagination simple current={this.state.page} defaultPageSize={16} total={this.state.data.total} onChange={this.handleChangePage} />
      </div>
    );
  }
}

export default SearchPhoto;
