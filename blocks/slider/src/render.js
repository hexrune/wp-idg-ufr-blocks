import {Fragment} from "react";

/**
 * Componente para renderizar o bloco.
 * É aplicado em dois locais diferentes em edit.js e um em save.js
 *
 * @param {boolean} preview Determina se está em modo preview (bloco isSelected), para renderizar diferente, se necessário
 * @return {JSX.Element} Renderização do bloco
 */
export default function Render({ preview, attributes }) {
	const {
		usePosts,
		postType,
		postCategory,
		postTag,
		duration,
		images,
		sliderID,
		useContainer,
		useCard,
		containerColor,
		showExcerpt,
		showTitle,
		postsQuantity,
		height,
		width,
		autoplay,
		wpPostType,
		mobileHeight,
		useThumbnails,
		disableLegendOnMobile,
	} = attributes;

	const containerStyle = {
		background: useContainer ? containerColor : '',
		padding: '15px',
		borderRadius: useContainer ? '3px' : '',
	};

	function RenderFromImages({ thumbnail = false }) {
		return images.map(({ caption, alt, url }) => {
			const useLegend = !thumbnail && caption;

			return (
				<li className="splide__slide" data-splide-interval={duration * 1000}>
					<img src={url} alt={alt ?? caption ?? ''} />

					{useLegend &&
						<div className="description">
							{caption}
						</div>
					}
				</li>
			);
		});
	}

	return (
		<Fragment>
			<div className={`splide-container ${useCard && 'br-card'}`} style={containerStyle} data-slide-container={`${sliderID}-container`}>
				<div className="splide splide-main" id={sliderID}>
					<div className="splide__track">
						<ul className="splide__list">
							{!usePosts && <RenderFromImages />}
						</ul>
					</div>
				</div>

				{useThumbnails && (
					<div className="splide splide-thumbnail" id={`${sliderID}-thumbnail`}>
						<div className="splide__track">
							<ul className="splide__list">
								{!usePosts && <RenderFromImages thumbnail />}
							</ul>
						</div>
					</div>
				)}
			</div>

			{/* @see assets/client.esnext.js */}
			<script>
				{`
					document.addEventListener('DOMContentLoaded', function(){
						ufrSetUpSliders({
							usePosts: ${usePosts},
							postType: '${postType}',
							postCategory: '${postCategory}',
							postTag: '${postTag}',
							sliderID: '${sliderID}',
							postsQuantity: ${postsQuantity},
							duration: ${duration},
							autoplay: ${autoplay},
							height: '${height}',
							width: '${width}',
							showExcerpt: ${showExcerpt},
					        showTitle: ${showTitle},
							wpPostType: '${wpPostType}',
							mobileHeight: '${mobileHeight}',
							useThumbnails: ${useThumbnails},
							disableLegendOnMobile: ${disableLegendOnMobile},
						})
					});
				`}
			</script>
		</Fragment>
	);
}
