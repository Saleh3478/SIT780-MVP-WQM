// for ESM environment, need to import modules as:
// import bb, {line} from "billboard.js"

var chart = bb.generate({
  data: {
    columns: [
	["Carlton", 0.97, 0.99, 0.91, 0.88, 0.9, 0.88,0.97, 0.99, 0.91, 0.88, 0.9, 0.88],
	["Docklands", 0.89, 0.89, 0.98, 0.88, 0.92, 0.92,0.89, 0.89, 0.98, 0.88, 0.92, 0.92],
  ["East Melbourne", 0.94, 0.99, 0.98,0.97, 0.93, 0.92,0.94, 0.99, 0.98,0.97, 0.93, 0.92],
  ["Flemington", 0.89, 0.89, 0.98, 0.88, 0.92, 0.92,0.89, 0.89, 0.98, 0.88, 0.92, 0.92],
  ["Melbourne", 0.95, 0.92, 0.88, 0.95, 0.99, 0.93, 0.95, 0.92, 0.88, 0.95, 0.99, 0.93]
],
    type: "line", // for ESM specify as: line()
  },
  bindto: "#lineChart"
}); 