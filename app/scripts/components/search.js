import React from 'react';
import ReactDOM from 'react-dom';
const Component = React.Component;

class SearchBox extends Component {

  handleChange(event) {
    event.target.select();
  // this.setState({value: event.target.select()});
}
  render() {
    return (
      <div className="col-xs-12 search-container nopadding">
        <div className="row">

          <div className="col-xs-12 col-sm-6 col-lg-5">
            <a href="./" title="ReactJS Movie Search"><img src="../../images/tmdb-logo.png" className="logo" alt="The Movie Database" /></a>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form className="searchbox">
              <label>
                <input ref="search suggestion" onClick={this.handleChange} className="searchbox__input typeahead form-control" type="text" placeholder="Search Movie Title..." id="q" />
              </label>
              </form>
          </div>
        </div>
      </div>
    )
  }
}
module.exports = SearchBox;