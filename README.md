# jlpt-anki-to-json
This is a simple library I've created for taking Jonathan Waller's JLPT Anki files and converting them to a common JSON format.

All this library will do is take his Kanji/Vocab Anki files and convert them to two JSON files: `jlpt-kanji.json` and `jlpt-vocab.json`.

**Jonathan Waller's Site**: http://www.tanos.co.uk/jlpt/

# Anki Conversion
In order to properly use his tool, you need to download Jonathan Waller's Anki decks, which use the Anki 1.0 format, and convert them to
the Anki 2.0 APKG format.

***NOTE**: I will add photos soon...*

## Import Anki 1.0
To do this, first download the [latest version of Anki](https://apps.ankiweb.net/). You will need to use [a provided plugin](https://ankiweb.net/shared/info/175027074) to import the Anki 1.0 format into Anki 2.1+.

To install the plugin, open up Anki and go to `Anki > Tools > Add-ons`, click `Get Add-ons...` and add the code `175027074`.

***NOTE**: I have tested this on Anki 2.1.44 for macOS. While it's recommended to always use the latest Anki version, if it's too new the plugin may not have been updated to support it yet. If you run into errors, downgrade to 2.1.44 and try from there.*

## Export Anki 2.1+
Once these decks are imported, you can export them as APKG decks by click on the gear icon next to the deck and selecting `Export...`.

On the export settings, set the export format to `Anki Deck Package (*.apkg)` or whatever else says `.apkg` on it.

In addition, uncheck both `Include Media` and `Include scheduling information` since neither are necessary for this program to work.

Finally, click `Export...` and place everything in the same folder. Rename all the APKG files to use the following structure:

* **Kanji Deck**: `n<level>-kanji.apkg`
* **Vocab Deck**: `n<level>-vocab.apkg`

You will simply pass the folder with these files to the program and it will auto-import the APKG files using these names.

***Example**: The N5 Kanji deck should be renamed to `n5-kanji.apkg`.*

# Usage
To run this, first clone the directory and run `npm install` followed by `npm build`.

    git clone https://github.com/jaller200/jlpt-anki-to-json.git
    npm install
    npm build

To run, simply use the following command in the same folder:

    node . <ouput_dir> <anki_dir>

Set the output directory to where you want to place the generated JSON files, and set the Anki directory to where you saved all the APKG files.

# Credits
This library makes use of a modified version of CraigglesO's `anki-to-json` Node library, which can be found [here](https://github.com/CraigglesO/anki-to-json/) under the ISC License.

# License
This project is licensed under the MIT license and is free for anyone to use.

Third party licensing can be found in the `LICENSE.md` file.