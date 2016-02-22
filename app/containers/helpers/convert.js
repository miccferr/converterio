import geojsontoosm from 'geojsontoosm'
import extension from './checkExtension.js';
const remote = require('electron').remote;
const dialog = remote.require('dialog');

// import gdal from 'gdal';

export default function writeConvertedFile(infile, outfile, crs, err) {
  // check for errors in the first place
  if (!err) {
    var sm = gdal.SpatialReference.fromEPSG(3857);
    function isCRSok(crs) {
      try {

        return gdal.SpatialReference.fromEPSG(crs);
      } catch (e) {
        dialog.showErrorBox('Error', 'Wrong CRS');
      }
    }
    var outCRS = isCRSok(crs)
    var world = gdal.Geometry.fromWKT(
      'POLYGON((-180 -85.0513, 180 -85.0513, 180 85.0513, -180 85.0513, -180 -85.0513))',
      outCRS
    );
    var inDs = gdal.open(infile);
    var returned = extension.checkExtension(outfile);
    console.log(returned);
    var outDs = gdal.open(outfile, 'w', returned);
    var inLayer = inDs.layers.get(0);
    var outLayer = outDs.layers.create(inLayer.name, sm, inLayer.geomType);
    var toSm = new gdal.CoordinateTransformation(inLayer.srs, sm);
    var toNative = new gdal.CoordinateTransformation(outCRS, inLayer.srs);

    try {
      world.transform(toNative);
    } catch (err) {} // noop, will leave world === null and we won't crop anything

    inLayer.fields.forEach(function (field) {
      outLayer.fields.add(field);
    });

    inLayer.features.forEach(function (feature, err) {
      var projected = feature.clone();
      var geom = projected.getGeometry();

      // Originally null geometries are ok to pass through
      if (!geom) return outLayer.features.add(projected);

      // If we can crop features, do it
      if (world) geom = geom.intersection(world);

      // If geom is null at this point, that means it got cropped out
      if (!geom) return;

      // Otherwise, transform the feature, pass it through to the output
      geom.transform(toSm);
      projected.setGeometry(geom);
      outLayer.features.add(projected);
    });

    outLayer.flush();

    // print success message
    dialog.showMessageBox({
      message: "The file has been saved! :-)",
      buttons: ["OK"]
    });
  } else {
    // print error
    dialog.showErrorBox("Error", 'File Save Error');
  }


}
