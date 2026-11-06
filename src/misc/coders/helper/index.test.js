import Helper from './index';

test('AppendFramerateOptions omits -r for passthrough', () => {
	const local = [];
	Helper.AppendFramerateOptions(local, { fps: '30', fps_mode: 'passthrough' }, { ffmpeg: { version_major: 5 } });
	expect(local).toEqual(['-fps_mode', 'passthrough']);
});

test('AppendFramerateOptions omits -r for vfr', () => {
	const local = [];
	Helper.AppendFramerateOptions(local, { fps: '30', fps_mode: 'vfr' }, { ffmpeg: { version_major: 5 } });
	expect(local).toEqual(['-fps_mode', 'vfr']);
});

test('AppendFramerateOptions keeps -r for cfr and auto', () => {
	const cfr = [];
	Helper.AppendFramerateOptions(cfr, { fps: '25', fps_mode: 'cfr' }, { ffmpeg: { version_major: 5 } });
	expect(cfr).toEqual(['-r', '25', '-fps_mode', 'cfr']);

	const auto = [];
	Helper.AppendFramerateOptions(auto, { fps: '25', fps_mode: 'auto' }, { ffmpeg: { version_major: 5 } });
	expect(auto).toEqual(['-r', '25', '-fps_mode', 'auto']);
});
