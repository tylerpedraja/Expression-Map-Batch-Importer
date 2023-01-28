const fs = require("fs");
const path = require("path");
const { parseString } = require("xml2js");
xml2js = require("xml2js");

// filepath to directory of the the expression maps you want to add to.
const FILEPATH = `C:/Users/${USER}/Desktop/...`;

// filepath of the directory you want to save the edited maps to.
const OUTPUT_FOLDER = `C:/Users/${USER}/Desktop/...`;

// Create the articulation/layering of whatever instrument you want in cubase, then open the file a code editor. Take the added <ob /> node and paste it here....
let elem1 = `<obj class="USlotVisuals" ID="2532053504">
<int name="displaytype" value="1"/>
<int name="articulationtype" value="0"/>
<int name="symbol" value="73"/>
<string name="text" value="Marc + Long" wide="true"/>
<string name="description" value="Marc + Long" wide="true"/>
<int name="group" value="0"/>
</obj>`;

// The second node associated with the articulation goes here...
let elem2 = `<obj class="PSoundSlot" ID="2725730464">
<obj class="PSlotThruTrigger" name="remote" ID="874768480">
   <int name="status" value="144"/>
   <int name="data1" value="35"/>
</obj>
<obj class="PSlotMidiAction" name="action" ID="2726785632">
   <int name="version" value="600"/>
   <member name="noteChanger">
      <int name="ownership" value="1"/>
      <list name="obj" type="obj">
         <obj class="PSlotNoteChanger" ID="2730172384">
            <int name="channel" value="-1"/>
            <float name="velocityFact" value="1"/>
            <float name="lengthFact" value="1"/>
            <int name="minVelocity" value="0"/>
            <int name="maxVelocity" value="127"/>
            <int name="transpose" value="0"/>
            <int name="minPitch" value="0"/>
            <int name="maxPitch" value="127"/>
         </obj>
      </list>
   </member>
   <member name="midiMessages">
      <int name="ownership" value="1"/>
      <list name="obj" type="obj">
         <obj class="POutputEvent" ID="2721867040">
            <int name="status" value="144"/>
            <int name="data1" value="0"/>
            <int name="data2" value="1"/>
         </obj>
         <obj class="POutputEvent" ID="874806432">
            <int name="status" value="144"/>
            <int name="data1" value="0"/>
            <int name="data2" value="9"/>
         </obj>
      </list>
   </member>
   <int name="channel" value="-1"/>
   <float name="velocityFact" value="1"/>
   <float name="lengthFact" value="1"/>
   <int name="minVelocity" value="0"/>
   <int name="maxVelocity" value="127"/>
   <int name="transpose" value="0"/>
   <int name="maxPitch" value="127"/>
   <int name="minPitch" value="0"/>
   <int name="key" value="0"/>
   <int name="key2" value="0"/>
</obj>
<member name="sv">
   <int name="ownership" value="2"/>
   <list name="obj" type="obj">
      <obj class="USlotVisuals" ID="2532051424">
         <int name="displaytype" value="1"/>
         <int name="articulationtype" value="0"/>
         <int name="symbol" value="73"/>
         <string name="text" value="Marc + Long" wide="true"/>
         <string name="description" value="Marc + Long" wide="true"/>
         <int name="group" value="0"/>
      </obj>
   </list>
</member>
<member name="name">
   <string name="s" value="Long + Marc" wide="true"/>
</member>
<int name="color" value="5"/>
</obj>`;

parseString(elem1, (err, result) => {
   elem1 = result
})

parseString(elem2, (err, result) => {
   elem2 = result
})

fs.readdir(FILEPATH, (err, files) => {
   if (err) throw err;
   files.forEach((file, i) => {
      if (path.extname(file) === ".expressionmap") {

         fs.readFile(path.join(FILEPATH, file), "utf8", (err, data) => {
            if (err) throw err;

            parseString(data, function (err, result) {
               if (err) console.log(err);
               // Perform edits here...
               let json = result;

               const name = json.InstrumentMap.string[0].$.value;
               json.InstrumentMap.string[0].$.value = `___${name}`;

               location1 = json.InstrumentMap.member[0].list[0].obj
               location1.push(elem1.obj)

               location2 = json.InstrumentMap.member[1].list[0].obj
               location2.push(elem2.obj)

               // Convert back to XML and write to file...
               var builder = new xml2js.Builder();
               var xml = builder.buildObject(json);


               fs.writeFile(path.join(OUTPUT_FOLDER, `__${file}`), xml, "utf8", (err) => {
                  if (err) throw err;
                  console.log(`${file} has been modified and saved to ${OUTPUT_FOLDER}`);
               });
            })
         });
      }

   });
});

// Tyler Pedraja 2023

