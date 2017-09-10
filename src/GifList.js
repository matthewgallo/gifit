import React, { Component } from 'react';
import './gifList.css';

class GifList extends Component {

  render() {
		const gifs = this.props.gifs;
    return (
      <div className="gif-list-container">
				<ul>
				{
					gifs !== 'No results'
						? gifs.map((gif) => {
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
						: gifs
				}
				</ul>
      </div>
    );
  }
}

export default GifList;
