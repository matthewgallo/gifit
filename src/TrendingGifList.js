import React, { Component } from 'react';
import './gifList.css';
import './trendingGifList.css';

class TrendingGifList extends Component {

  render() {
		const trending = this.props.trendingGifs;
    return (
      <div className="gif-list-container">
				<ul>
				{
					trending !== 'No results'
						? trending.map((gif) => {
							return (
								<li
									key={gif.id}
									className="gif-item-parent"
								>
									<img
										src={gif.images.fixed_width.url}
										alt="Gif"
										className="gif-item-img"
									/>
								</li>
							)
						})
						: trending
				}
				</ul>
      </div>
    );
  }
}

export default TrendingGifList;
