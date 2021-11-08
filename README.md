# jlpt-anki-to-json
This is a simple library I've created for taking Jonathan Waller's JLPT Anki files and converting them to a common JSON format.

All this library will do is take his Kanji/Vocab Anki files and convert them to two JSON files: `jlpt-kanji.json` and `jlpt-vocab.json`.

**Jonathan Waller's Site**: http://www.tanos.co.uk/jlpt/

## Anki Conversion
In order to properly use his tool, you need to download Jonathan Waller's Anki decks, which use the Anki 1.0 format, and convert them to
the Anki 2.0 APKG format.

To do this, first download the [latest version of Anki](https://apps.ankiweb.net/). You will need to use [a provided plugin](https://ankiweb.net/shared/info/175027074) to import the Anki 1.0 format into Anki 2.1+.

To install the plugin, open up Anki and go to `Anki > Tools > Add-ons`, click `Get Add-ons...` and add the code `175027074`.

***NOTE**: I have tested this on Anki 2.1.44 for macOS. While it's recommended to always use the latest Anki version, if it's too new the plugin may not have been updated to support it yet. If you run into errors, downgrade to 2.1.44 and try from there.*

## Usage
To run this, first clone the directory and run `npm install` followed by `npm build`.

    git clone https://github.com/jaller200/jlpt-anki-to-json.git
    npm install
    npm build

After this, download the Anki files from Jonathan Waller's site (both the `-vocab-kanji-eng.anki` and `-kanji-char-eng.anki` files for
each level) and place them all in one folder, renaming them with the following structure:

* **Kanji Anki Files**: Rename to `n<level>-kanji.apkg`
* **Vocab Anki Files**: Rename to `n<level>-vocab.apkg`

This will generate a `dist/` folder. To run, simply use the following command:

    node . <ouput_dir> <anki_dir>

This will generate the files if possible, using the following format:

## Credits
This library makes use of a modified version of the CraigglesO's `anki-to-json` Node library, which can be found [here](https://github.com/CraigglesO/anki-to-json/) under the ISC License.

## License
This project is licensed under the MIT license and is free for anyone to use.

Third party licensing can be found in the `LICENSE.md` file.