# jlpt-anki-to-json
This is a simple library I've created for taking [Jonathan Waller's JLPT Anki files](http://www.tanos.co.uk/jlpt/) and converting them to a common JSON key-value format.

Both vocab and kanji decks will be converted to the following structure:

    {
        [key: string]: int
    }

Where the key is the **Kanji or Vocab (UTF-8)** and the integer value is the **JLPT Level (1-5)**.



# Anki Conversion
In order to properly use his tool, you first need to download Jonathan Waller's Anki decks, which use the Anki 1.0 format, and convert them to the Anki 2.0 APKG format.

**Jonathan Waller's Site**: http://www.tanos.co.uk/jlpt/

*NOTE: Use the `-kanji-vocab-eng.anki` and `-kanji-char-eng.anki` files from each N-level page*

## Import Anki 1.0
First, [download Anki](https://apps.ankiweb.net/). I've tested this with `Version 2.1.44`, but if the conversion plugin below allows, you can try the latest version. 

Second, you will need to use [this provided plugin](https://ankiweb.net/shared/info/175027074) to import the Anki 1.0 format into Anki 2.1+. To install the plugin, open Anki and go to `Anki > Tools > Add-ons`, click `Get Add-ons...` and add the code `175027074`. Restart the program.

To import a `.anki` file, click `File > Import...` and select it in the file browser. You should see a success message if it worked.

## Export Anki 2.1+
Once these decks are imported, you can export them as APKG decks by click on the gear icon next to the deck and selecting `Export...`. In the export settings, set the export format to `Anki Deck Package (*.apkg)` and uncheck both checkboxes (`Include Media` and `Include scheduling information`). These are unnecessary.

Click `Export...` and place everything in the same folder. Rename all the APKG files to use the following structure:

* **Kanji Deck**: `n<level>-kanji.apkg` | (*i.e. `n5-kanji.apkg`*)
* **Vocab Deck**: `n<level>-vocab.apkg` | (*i.e. `n5-vocab.apkg`*)

You will simply pass the folder with these files to the program and it will auto-import the APKG files using these names.

# Usage
To run this, first clone the directory and run `npm install` followed by `npm run build`.

    git clone https://github.com/jaller200/jlpt-anki-to-json.git
    cd jlpt-anki-to-json
    npm install
    npm run build

To run, simply use the following command in the same folder:

    node . [-p] [-o <output_dir>] <anki_dir>

The `-o` flag sets the output directory for the JSON files (by default it is the current directory), and the `-p` flag is used for pretty-printing the output file.

# Credits
This library makes use of a modified version of [CraigglesO's `anki-to-json` Node library](https://github.com/CraigglesO/anki-to-json/), which is under the ISC License.

# License
This project is licensed under the MIT license and is free for anyone to use. Third party licensing can be found in the `LICENSE.md` file.