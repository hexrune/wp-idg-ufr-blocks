import { useBlockProps } from '@wordpress/block-editor';
import { UFRBlockHeader, UFRSelect, UFRCheckbox, UFRGaleryBtn, UFRInput }from '../../../components/dist/index.modern';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Fragment } from 'react';
import Render from "./render";
import './editor.scss';
import {v1 as uuid} from "uuid";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({ attributes, setAttributes, isSelected }) {
	/**
	 * Desestruturação dos atributos do bloco registrados em block.json -> "attributes"
	 */
	const {
		usePosts,
		postType,
		postCategory,
		postTag,
		duration,
		useCard,
		images,
		sliderID,
		useContainer,
		containerColor,
		showExcerpt,
		showTitle,
		postsQuantity,
		height,
		width,
		autoplay,
		wpPostType,
		mobileHeight,
		disableLegendOnMobile,
		useThumbnails,
	} = attributes;

	const [wpPostTypeOptions, setWpPostTypeOptions] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [tagOptions, setTagOptions] = useState([]);

	const postTypeOptions = [
		{ label: 'Mais recentes', value: 'most-recent' },
		{ label: 'Mais visitados', value: 'most-seen' },
		{ label: 'Por categoria', value: 'category' },
		{ label: 'Por tag', value: 'tag' },
	];

	if (!sliderID) setAttributes({ sliderID: `slider-${uuid()}` });

	useEffect(() => {
		const optionsToGet = [
			{
				attr: 'wpPostType',
				path: '/wp/v2/types',
				set: setWpPostTypeOptions,
			},
			{
				attr: 'postCategory',
				path: '/wp/v2/categories',
				set: setCategoryOptions,
			},
			{
				attr: 'postTag',
				path: '/wp/v2/tags',
				set: setTagOptions,
			},
		];

		optionsToGet.forEach(({ path, set, attr }) => {
			apiFetch({ path }).then((res) => {
				if (!Array.isArray(res)) {
					const exclude = ['attachment', 'page', 'wp_block', 'wp_template'];

					res = Object.values(res).filter((item) => !exclude.includes(item?.slug));
				}

				const options = res.map((item) => ({
					label: item.name === 'post' ? 'posts' : item.name,
					value: item?.id ?? item?.slug,
				}));

				set(options);
			})
		});
	}, []);

	useEffect(() => {
		if (postType === 'category' && !postCategory) setAttributes({ postCategory: categoryOptions[0].value });
		if (postType === 'tag' && !postTag) setAttributes({ postTag: tagOptions[0].value });
	}, [postType, categoryOptions, tagOptions]);

	useEffect(() => {
		if (!isSelected) {
			// @see assets/client.esnext.js
			window.ufrSetUpSliders({
				usePosts,
				postType,
				postCategory,
				postTag,
				useCard,
				sliderID,
				postsQuantity,
				duration,
				showExcerpt,
				showTitle,
				autoplay,
				height,
				width,
				wpPostType,
				mobileHeight,
				disableLegendOnMobile,
				useThumbnails,
			});
		}
	}, [isSelected])

	/**
	 * Renderiza o conteúdo. Esconde as configurações do bloco quando ele não está selecionado.
	 *
	 * @param { boolean } selected
	 * @return {JSX.Element} Elemento principal condicional
	 */
	function ConditionalMainContentRender(selected) {
		return selected ? (
			// Visuzalização quando selecionado
			<div
				{...useBlockProps({
					className: 'edit block-responsive ufr-block-component',
				})}
			>
				<div className="row align-items-center">
					<div className="col config">
						<UFRBlockHeader
							title="Slider de Imagens e Postagens"
						/>

						<UFRCheckbox
							label="Usar Postagens no Slider"
							checked={usePosts}
							attr="usePosts"
							setter={setAttributes}
						/>

						{usePosts ? (
							<Fragment>
								<UFRSelect
									label="Tipo de Postagens"
									options={wpPostTypeOptions}
									value={wpPostType}
									attr="wpPostType"
									setter={setAttributes}
								/>

								<UFRSelect
									label="Selecionar Postagens Por"
									options={postTypeOptions}
									value={postType}
									attr="postType"
									setter={setAttributes}
								/>

								<UFRInput
									label="Quantidade de Postagens"
									value={postsQuantity}
									attr="postsQuantity"
									setter={setAttributes}
								/>


								{/* Nos selects abaixo, por alguma razão os componentes do pacote 'wp-idg-ufr__block-components' causam problemas e foram substituídos por lógica local. */}

								{postType === 'category' &&
									<select value={postCategory} onChange={(e) => setAttributes({ postCategory: e.target.value })}>
										{categoryOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
									</select>
								}

								{postType === 'tag' &&
									<select value={postTag} onChange={(e) => setAttributes({ postTag: e.target.value })}>
										{tagOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
									</select>
								}
							</Fragment>
						) : (
							<Fragment>
								<UFRGaleryBtn
									text="Selecionar Imagens"
									icon="fa fa-picture-o"
									allowedTypes={['image']}
									value={images}
									attr={'images'}
									multiple
									setter={setAttributes}
								/>

								<span style={{ color: 'darkred' }}>
									{images.length} imagens selecionadas.
								</span>
							</Fragment>
						)}

						<h3>Configurações Opcionais</h3>

						<UFRInput
							label="Altura do Slider (Incluir unidade de medida. Ex.: 400px)"
							value={height}
							type="text"
							attr="height"
							setter={setAttributes}
						/>

						<UFRInput
							label="Altura do Slider (Mobile)"
							value={mobileHeight}
							type="text"
							attr="mobileHeight"
							setter={setAttributes}
						/>

						<UFRInput
							label="Largura do Slider (Incluir unidade de medida. Ex.: 800px)"
							value={width}
							type="text"
							attr="width"
							setter={setAttributes}
						/>

						{autoplay && <UFRInput
							label="Duração de Exibição dos Slides em Segundos"
							value={duration}
							type="number"
							attr="duration"
							setter={setAttributes}
						/>}

						<UFRCheckbox
							label="Slides são trocados automáticamente"
							checked={autoplay}
							attr="autoplay"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar miniaturas"
							checked={useThumbnails}
							attr="useThumbnails"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Título da Postagem"
							checked={showTitle}
							attr="showTitle"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Mostrar Descrição da Postagem"
							checked={showExcerpt}
							attr="showExcerpt"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Desativar legendas quando em mobile"
							checked={disableLegendOnMobile}
							attr="disableLegendOnMobile"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver Slider em um Cartão"
							checked={useCard}
							attr="useCard"
							setter={setAttributes}
						/>

						<UFRCheckbox
							label="Envolver Slider em um Bloco Colorido"
							checked={useContainer}
							attr="useContainer"
							setter={setAttributes}
						/>

						{useContainer &&
							<UFRInput
								label="Cor de Fundo do Bloco Envolvente"
								value={containerColor}
								type="color"
								attr="containerColor"
								setter={setAttributes}
							/>
						}
					</div>
				</div>
			</div>
		) : (
			// Visuzalização quando não selecionado
			<div
				{...useBlockProps({
					className: 'show block-responsive ufr-block-component',
				})}
			>
				<div className="row">
					<div className="col-12">
						<Render attributes={attributes} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<Fragment>
			{ConditionalMainContentRender(isSelected)}
		</Fragment>
	);
}
