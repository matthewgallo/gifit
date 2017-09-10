import React, { Component } from 'react';
import { fetchGifs, fetchTrendingGifs, fetchRandomGifs } from './Api';
import GifList from './GifList';
import RandomGifList from './RandomGifList';
import TrendingGifList from './TrendingGifList';
import './App.css';

class App extends Component {

	constructor(props) {
    super(props);
    this.state = {
			search: '',
			searchGifs: [],
			trendingGifs: [],
			randomGifs: {},
		};

    this.handleChange = this.handleChange.bind(this);
    this.fetchSearched = this.fetchSearched.bind(this);
  }

	fetchSearched = (e) => {
		e.preventDefault();
		fetchGifs(this.state.search, data => {
			if (data.success) {
				if (data.body.data.length > 0) {
					this.setState({
						trendingGifs: [],
						searchGifs: data.body.data,
						randomGifs: {},
					});
				} else {
					this.setState({
						trendingGifs: [],
						searchGifs: 'No results',
						randomGifs: {},
					});
				}
			}
		});
	}

	handleChange(event) {
    this.setState({search: event.target.value});
  }

	clearGifs = () => {
		this.setState({
			search: '',
			searchGifs: [],
			trendingGifs: [],
			randomGifs: {},
		});
	}

	fetchTrending = () => {
		fetchTrendingGifs(data => {
			console.log(data);
			if (data.success) {
				if (data.body.data.length > 0) {
					this.setState({
						search: '',
						searchGifs: [],
						trendingGifs: data.body.data,
						randomGifs: {},
					});
				} else {
					this.setState({
						search: '',
						searchGifs: [],
						trendingGifs: 'No results',
						randomGifs: {},
					});
				}
			}
		});
	}

	fetchRandom = () => {
		fetchRandomGifs(data => {
			if (data.success) {
					this.setState({
						search: '',
						searchGifs: [],
						trendingGifs: [],
						randomGifs: data.body.data,
					});
			}
		});
	}

  render() {
		const search = this.state.search;
    return (
      <div className="App">
				<form onSubmit={this.fetchSearched}>
	        <input value={search} type="text" onChange={this.handleChange} className="gif-search-input"/>
					<button type="button" onClick={this.fetchTrending}>Trending</button>
					<button type="button" onClick={this.fetchRandom}>Random</button>
				</form>
				{
					this.state.searchGifs.length || this.state.trendingGifs.length || this.state.randomGifs
						? <button onClick={this.clearGifs}>Clear</button>
						: null
				}
				<GifList
					gifs={this.state.searchGifs}
				/>
				<TrendingGifList
					trendingGifs={this.state.trendingGifs}
				/>
				<RandomGifList
					randomGifs={this.state.randomGifs}
				/>
				{
					this.state.searchGifs.length || this.state.trendingGifs.length || this.state.randomGifs
						? null
						: "Search for gifs"
				}
      </div>
    );
  }
}

export default App;
