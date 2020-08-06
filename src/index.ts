import yargs from "yargs";
import IotaxConfigurator from "./iotaxConfigurator";

try {
  IotaxConfigurator.parseCommandLine(yargs);
} catch (error) {
    console.log("Here: ", error);
}
