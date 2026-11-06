function InitStream(initialStream) {
	if (!initialStream) {
		initialStream = {};
	}

	let stream = {
		codec: '',
		...initialStream,
	};

	return stream;
}

function InitSkills(initialSkills) {
	if (!initialSkills) {
		initialSkills = {};
	}

	let skills = {
		ffmpeg: {},
		...initialSkills,
	};

	skills.ffmpeg = {
		version: '5.0.0',
		version_major: 5,
		version_minor: 0,
		...skills.ffmpeg,
	};

	return skills;
}

// FFmpeg rejects -r together with a non-CFR -fps_mode (passthrough / vfr).
// Only emit -r for CFR-compatible modes; always emit -fps_mode on FFmpeg >= 5.
function AppendFramerateOptions(local, settings, skills) {
	skills = InitSkills(skills);

	const mode = settings.fps_mode || 'auto';
	if (mode !== 'passthrough' && mode !== 'vfr') {
		local.push('-r', `${settings.fps}`);
	}

	if (skills.ffmpeg.version_major >= 5) {
		local.push('-fps_mode', `${mode}`);
	}

	return local;
}

export default {
	InitStream,
	InitSkills,
	AppendFramerateOptions,
};
