import path from 'path';
import os from 'os';
import ElectronPreferences from 'electron-preferences';

const todoDir = path.join(os.homedir(), '.todo');

export default new ElectronPreferences({
  dataStore: path.join(todoDir, 'preferences.json'),
  defaults: {
    basic: {
      SOURCE_IMAGE: path.join(todoDir, 'test.jpg'),
      TODOTXT_PATH: path.join(todoDir, 'todo.txt')
    },
    wallpaper: {
      PATH: path.join(todoDir, 'wallpaper_{}.png'),
      WILDCARD: path.join(todoDir, 'wallpaper_*'),
      SIZE: {
        WIDTH: 2560,
        HEIGHT: 1600
      },
      FONT_PATH: path.join(todoDir, 'SF-Pro-Text-Semibold.otf'),
      FONT_SIZE: 28,
      TITLE_FONT_SIZE: 36,
      FILL_COLOR: 'white',
      TITLE_UNDERLINE_OFFSET: 8,
      START_POSITION: {
      	X: 96,
      	Y: 120
      },
      GROUP_V_OFFSET: 60,
      FIRST_ITEM_OFFSET: 72,
      LINE_WIDTH: 3,
      SHADOW_X_OFFSET: 2,
      SHADOW_Y_OFFSET: 3,
      SHADOW_COLOR: [30, 30, 30],

      CHECKBOX_OFFSET: 18,
      CHECKBOX_SIZE: 28,
      CHECKBOX_TOP_OFFSET: 2,
      TODO_OFFSET: 18
    }
  },
  sections: [
  	{
  		id: 'basic',
  		label: 'Settings',
  		icon: 'settings-gear-63',
  		form: {
  			groups: [
  				{
  					label: 'Basics',
  					fields: [
  						{
  							label: 'Wallpaper image',
	              key: 'SOURCE_IMAGE',
	              type: 'text'
  						}
  					]
  				}
  			]
  		}
  	}
  ]
})