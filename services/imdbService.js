const debug = require('debug')('app:imdbService');
const chalk = require('chalk');
const request = require('request');
const cheerio = require('cheerio');

const cheerioPlugins = {
	between(start, end, includeStart, includeEnd) {
		const value = this.text();
		if (!value) {
			return null;
		}
		const startIndex = (() => {
			if (!Number.isNaN(Number(start))) {
				return Number(start);
			}
			if (value.includes(start)) {
				if (includeStart) {
					return value.indexOf(start);
				}
				return value.indexOf(start) + 1;
			}
			return 0;
		})();
		const endIndex = (() => {
			if (!Number.isNaN(Number(end))) {
				return Number(end);
			}
			if (value.includes(end)) {
				if (includeEnd) {
					return value.indexOf(end) + 1;
				}
				return value.indexOf(end);
			}
			return value.length;
		})();
		return value.substring(startIndex, endIndex).trim();
	}
};

module.exports = {
	getMovie: (imdbId) => {
		debug(chalk.green(`Getting informtion for [${imdbId}] from IMDB`));
		return new Promise((resolve, reject) => {
			request(
				{
					url: `https://www.imdb.com/title/${imdbId}/`,
					headers: {
						'User-Agent': 'Firefox/66.0'
					}
				},
				(error, response, html) => {
					if (error) {
						debug(chalk.red.bold(`Error connecting to IMDB`, error));
						reject({
							message: error
						});
					}
					let $ = cheerio.load(html);
					$.prototype.textBetween = cheerioPlugins.between;
					const movie = {
						title: $('h1').textBetween(0, '('),
						year: $('h1').textBetween('(', ')'),
						originalTitle: $('.titleBar .originalTitle').textBetween(0, '('),
						id: {
							imdb: $('meta[property="pageId"]').attr('content')
						},
						url: {
							imdb: $('link[rel="canonical"]').attr('href')
						},
						rate: {
							imdb: +$('[itemprop="ratingValue"]')
								.text()
								.trim(),
							metascore: +$('.metacriticScore')
								.text()
								.trim()
						},
						runtime: parseInt(
							$('#titleDetails h3:contains("Technical Specs")')
								.next('.txt-block')
								.find('time')
								.text(),
							0
						),
						plot: {
							simple: $('.summary_text')
								.text()
								.trim(),
							full: $('[itemprop="description"]')
								.text()
								.trim()
						},
						languages: $('#titleDetails h4:contains("Language")')
							.siblings()
							.text()
							.toLowerCase()
							.split('|'),
						countries: $('#titleDetails h4:contains("Country")')
							.siblings()
							.text()
							.trim()
							.toLowerCase()
							.split('|'),
						genres: $('#titleStoryLine h4:contains("Genres")')
							.siblings()
							.text()
							.trim()
							.toLowerCase()
							.split('|'),
						directors: [],
						writers: [],
						actors: [],
						awardsLink: `https://www.imdb.com/${$('#titleAwardsRanks a[href*="awards"]').attr('href')}`,
						awards: {
							summary: $('#titleAwardsRanks .awards-blurb')
								.text()
								.replace(/[\n]+/g, '')
								.trim()
								.replace(/\s+/g, ' ')
								.trim(),
							full: []
						}
					};
					$('.credit_summary_item [itemprop="director"] a').each(function(directorIndex, directorElement) {
						movie.directors[directorIndex] = {
							name: $(directorElement)
								.text()
								.toLowerCase()
								.trim(),
							id: $(directorElement)
								.attr('href')
								.match(/nm\d*/)[0]
						};
					});
					$('.credit_summary_item [itemprop="creator"] a').each(function(writerIndex, writerElement) {
						movie.writers[writerIndex] = {
							name: $(writerElement)
								.text()
								.toLowerCase()
								.trim(),
							id: $(writerElement)
								.attr('href')
								.match(/nm\d*/)[0]
						};
					});
					$('.cast_list tr[class]').each(function(castIndex, castElement) {
						movie.actors[castIndex] = {
							name: $(castElement)
								.find('[itemprop="name"]')
								.text()
								.toLowerCase()
								.trim(),
							id: '',
							character: $(castElement)
								.find('.character')
								.text()
								.toLowerCase()
								.trim(),
							picture: $(castElement)
								.find('.primary_photo img')
								.attr('src')
						};
					});
					request(movie.awardsLink, (error, response, html) => {
						if (error) {
							debug(chalk.red.bold(`Error connecting to IMDB awards`, error));
							reject({
								message: error
							});
						}
						$ = cheerio.load(html);
						$('.article > h3').each(function(awardIndex, awardElement) {
							movie.awards.full[awardIndex] = {
								name: $(this)
									.text()
									.replace(/[\n]+/g, '')
									.trim()
									.replace(/\s+/g, ' ')
									.trim()
									.toLowerCase()
									.split(
										$(this)
											.text()
											.replace(/[\n]+/g, '')
											.trim()
											.replace(/\s+/g, ' ')
											.trim()
											.match(/\d/)[0]
									)[0]
									.trim(),
								year: +$(this)
									.find('.event_year')
									.text()
									.trim(),
								title: $(this)
									.next('.awards')
									.find('.award_category')
									.text()
									.toLowerCase()
									.trim(),
								outcomes: []
							};
							$(this)
								.next('.awards')
								.find('tr')
								.each((categoryIndex, categoryElement) => {
									movie.awards.full[awardIndex].outcomes[categoryIndex] = {
										result: $(categoryElement)
											.find('.title_award_outcome b')
											.text()
											.toLowerCase()
											.trim(),
										award: $(categoryElement)
											.find('.title_award_outcome .award_category')
											.text()
											.trim(),
										category: $(categoryElement)
											.find('.award_description')
											.text()
											.trim()
											.toLowerCase()
											.split('\n')[0],
										participants: $(categoryElement)
											.find('.award_description a')
											.map(function(index, element) {
												return $(element)
													.text()
													.toLowerCase()
													.trim();
											})
											.get()
									};
								});
						});

						resolve(movie);
					});
				}
			);
		});
	}
};
