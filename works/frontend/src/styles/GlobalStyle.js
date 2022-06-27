import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 17px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}


	body {
		font-size: 1rem;
		font-family: ${(props) => props.theme.font}, sans-serif;
		color: ${(props) => props.theme.primaryColor};
		background-color: ${(props) => props.theme.bg};
		line-height: 1.8;
		width: 100vw;
		overflow-x: hidden;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: ${(props) => props.theme.font}, sans-serif;
		font-weight: 500;
		font-style: normal;
	}

	h7 {
		font-family: flood-std, sans-serif;
		font-weight: 400;
		font-style: normal;
	}


	a {
		text-decoration: none;
		color: inherit;
	}

	input, textarea {
		font-family: ${(props) => props.theme.font}, sans-serif;
		font-size: 1rem;
	}


	input:focus, textarea:focus, button:focus, video:focus {
			outline: none;
	}

	button {
		font-family: ${(props) => props.theme.font}, sans-serif;
		font-size: 1rem;
		cursor: pointer;
	}

	textarea {
		resize: none;
	}

	svg, .pointer {
		cursor: pointer;
	}

	.secondary {
		color: ${(props) => props.theme.secondaryColor};
	}

	.avatar {
		height: 22px;
		width: 22px;
		border-radius: 10px;
		object-fit: fill;
	}


	.md {
		height: 50px;
		width: 50px;
		border-radius: 25px;
	}

	.small {
		font-size: 0.9rem;
	}

	.lg {
		height: 60px;
		width: 60px;
		border-radius: 30px;
		object-fit: fill;
	}

	.flex-row {
		display: flex;
		align-items: center;
	}

	.flex-row img, .flex-row svg {
		margin-right: 0.1rem;
	}

	.ruler {
		height: 1px;
		background: ${(props) => props.theme.darkGrey};
		margin: 1rem 0;
	}
	.Toastify__toast-container--top-left {
		top: 5em;
		left: 2em;
		position:absolute;
		z-index:98;
	}
	
	.Toastify__toast {
		font-family: ${(props) => props.theme.font}, sans-serif;
		border-radius: 4px;
	}

	.Toastify__toast--error {
		background: ${(props) => props.theme.gradient};
	}

	.Toastify__toast--dark, .Toastify__toast--default {
		background: ${(props) => props.theme.purple};
    	color: ${(props) => props.theme.white};
	}
	
	.pointer {
		cursor: pointer !important;
	}

	.asterisk {
		color: ${(props) => props.theme.red};
	}

	@media screen and (max-width: 530px) {
		body {
			font-size: 0.95rem;
		}
		.Toastify__toast-container--top-left {
			top: 5em;
			left: 1em;
			position:absolute;
		}

		button {
			font-size: 0.9rem;
	  }
	}
	/* Make the video relative, instead of absolute, so that
		the parent container will size based on the video. Also,
		note the max-height rule. Note the line-height 0 is to prevent
		a small artifact on the bottom of the video.
		For more detail kindly check https://stackoverflow.com/questions/46747320/limit-the-height-in-videojs-in-fluid-mode
 	 */
	.video-js.vjs-fluid,
	.video-js.vjs-16-9,
	.video-js.vjs-4-3,
	video.video-js,
	video.vjs-tech {
		position: relative !important;
		width: 100%;
		height: 100% !important;
		max-width: 100% !important;
		padding-top: 0 !important;
		line-height: 0;
	}

	.video-js.vjs-fluid
	 {
		max-height: calc(100vh - 200px);
		.video-js.vjs-16-9,
		.video-js.vjs-4-3,
		video.video-js,
		video.vjs-tech { 
			max-height: calc(100vh - 200px);
		}
	}

	.video-js.vjs-fullscreen
	 {
		max-height: 100vh;
		.video-js.vjs-16-9,
		.video-js.vjs-4-3,
		video.video-js,
		video.vjs-tech { 
			max-height: 100vh;
		}
	}

	/* Fix the control bar due to us resetting the line-height on the video-js */
	.vjs-control-bar {
		line-height: 1;
	}

	.homeCategoryModel {
		position: fixed;
		z-index: 1000;
		width: 40vw;
		height: 80vh;
		margin: 2% auto; 
		left: 0;
		right: 0;
		border-radius: 5px;
		overflow: auto;
		background: rgb(2,0,36);
background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(32,32,32,1) 0%, rgba(52,52,52,1) 100%);

		@media screen and (max-width: 1024px) {
			width: 50vw;
		}

		@media screen and (max-width: 768px) {
			width: 65vw;
		}

		@media screen and (max-width: 600px) {
			width: 80vw;
		}

		@media screen and (max-width: 480px) {
			width: 90vw;
		}

		/* width */
		::-webkit-scrollbar {
			width: 8px;
			border-radius: 10rem;
		}

		/* Track */
		::-webkit-scrollbar-track {
			background: #000;
			border-radius: 10px;
		}

		/* Handle */
		::-webkit-scrollbar-thumb {
			background: #202020;
		}

		/* Handle on hover */
		::-webkit-scrollbar-thumb:hover {
			background: rgb(246, 92, 139);
		}
	}
	
	
	.SidebarOpened {
		transform: translateY(0) !important;
	}

	.UploadModelShow {
		transform: translateY(0) !important;
		opacity: 1 !important;
		scale: 1 !important;
	}

	.ShowMyPortalPage {
		transform: translateX(0) !important;
		opacity: 1 !important;
	}
	.ShowChatDetails {
		transform: translateX(0) !important;
		opacity: 1 !important;
	}

	.ShowMyAccountPage {
		transform: translateX(0) !important;
		opacity: 1 !important;
	}
	.ShowMyPortalPage {
		transform: translateX(0) !important;
		opacity: 1 !important;
	}
	.ShowUploadMomentForm,
	.ShowUploadClipForm,
	.ShowEditClipForm,
	.ShowCategoryRequestForm,
	.ShowEditMomentForm
	{
		transform: translateX(0) !important;
		opacity: 1 !important;
	}
	.createPlaylistModelActive,
	.createSeriesModelActive
	{
		transform: translateY(0) !important;
	}
`;

export default GlobalStyle;
