function ufrSetUpSliders(params) {
	const { autoplay, height, mobileHeight, width, sliderID, useThumbnails, disableLegendOnMobile } = params;

	async function getPosts(postType, postCategory, postTag, postsQuantity, wpPostType) {
		const postsUrl = window.ufrGlobals.siteUrl + `/wp-json/wp/v2/${wpPostType}?_embed=&_locale=user&per_page=${postsQuantity}`;

		switch (postType) {
			case 'most-recent':
				return (await fetch(postsUrl)).json();

			case 'most-seen':
				return (await fetch(window.ufrGlobals.siteUrl + `/wp-json/ufr/most-seen-posts?quantity=${postsQuantity}&type=${wpPostType}`)).json();

			case 'category':
				return (await fetch(postsUrl + `&categories=${postCategory}`)).json();

			case 'tag':
				return (await fetch(postsUrl + `&tags=${postTag}`)).json();
		}
	}

	async function holdRenderForPosts(params) {
		const {
			usePosts,
			postType,
			postCategory,
			sliderID,
			postsQuantity,
			duration,
			postTag,
			showExcerpt,
			showTitle,
			wpPostType,
		} = params;

		const ufrLoadPosts = new Event('ufrLoadPosts');

		if (!usePosts) return window.dispatchEvent(ufrLoadPosts);

		const mainSlider = document.getElementById(sliderID);
		const thumbnailSlider = document.getElementById(`${sliderID}-thumbnail`);
		const mainList = mainSlider.querySelector('.splide__list');
		const thumbnailList = thumbnailSlider?.querySelector('.splide__list');

		const posts = await getPosts(postType, postCategory, postTag, postsQuantity, wpPostType);

		if (!posts || posts.length === 0) {
			mainList.innerHTML = `
				<li class="splide__slide">
					<div class="not-found">Não foram encontrados posts</div>
				</li>
			`;

			return window.dispatchEvent(ufrLoadPosts);
		}

		posts.forEach(({ link, title, _embedded, thumbnail, excerpt }) => {
			let img = window.ufrGlobals.themeUrl + '/assets/img/logo/ufr-bg.png';
			let imgAlt = '';

			const embeddedImgAltTxt = _embedded ? _embedded['wp:featuredmedia']?.[0]?.alt_text: undefined;
			const embeddedImg = _embedded ? _embedded['wp:featuredmedia']?.[0]?.source_url : undefined;

			if (embeddedImg) img = embeddedImg;
			if (embeddedImgAltTxt) imgAlt = embeddedImgAltTxt;
			if (thumbnail) img = thumbnail;
			if (!(postType === 'most-seen')) title = title?.rendered ?? '';
			if (!(postType === 'most-seen')) excerpt = excerpt?.rendered ?? '';

			const useLegends = (showTitle && title?.length > 0) || (showExcerpt && excerpt?.length > 0);
			const legend = useLegends ? `
				<div class="description slide-description">
					<span class="title">${showTitle ? title : ''}</span>
					<br/>
					<span class="excerpt">${showExcerpt ? excerpt : ''}</span>
				</div>
			` : '';

			mainList.innerHTML += `
				<li class="splide__slide"
					data-splide-interval="${duration * 1000}"
					style="cursor: pointer;"
					onclick="location.href = '${link}'"
					onauxclick="window.open('${link}', '_blank')"
				>
					<img src="${img}" alt="${imgAlt}" />

					${legend}
				</li>
			`;

			if (useThumbnails && !window.isMobile) {
				thumbnailList.innerHTML += `
					<li class="splide__slide">
						<img src="${img}" alt="${imgAlt}" />
					</li>
				`;
			}
		})

		window.dispatchEvent(ufrLoadPosts);
	}

	window.addEventListener('ufrLoadPosts', function() {
		const main = document.getElementById(sliderID);
		const container = document.querySelector(`div[data-slide-container="${sliderID}-container"]`);

		const splideMain = new Splide(main, {
			type: 'fade',
			rewind: true,
			pagination: true,
			arrows: true,
			cover: true,
			width,
			height,
			autoplay,

			breakpoints: {
				640: {
					width: 640,
					height: mobileHeight,
				},
			}
		});

		splideMain.on('updated', (options) => {
			if (container) container.style.width = options.width;
			if (container) container.style.height = options.height + 15;
		});

		splideMain.on('mounted', () => {
			if (container) container.style.width = splideMain.options.width;
			if (container) container.style.height = splideMain.options.height + 15;

			if (disableLegendOnMobile && container?.style.width <= 640) {
				main.querySelectorAll('.description').forEach(el => el.style.display = 'none');
				container.style.height = mobileHeight + 15;
			}
		})

		if (useThumbnails && !window.isMobile) {
			const thumb = document.getElementById(`${sliderID}-thumbnail`);

			const splideThumbnails = new Splide(thumb, {
				fixedWidth: 100,
				fixedHeight: 60,
				gap: 10,
				rewind: true,
				pagination: false,
				cover: true,
				arrows: false,
				isNavigation: true,
				breakpoints: {
					600: {
						fixedWidth: 60,
						fixedHeight: 44,
					},
				},
			});

			splideMain.sync(splideThumbnails);
			splideMain.mount();
			splideThumbnails.mount();
		} else {
			splideMain.mount();
		}
	});

	void holdRenderForPosts(params);
}
