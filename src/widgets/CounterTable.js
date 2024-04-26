import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import { Colors } from "../components/utils/colors.utils";
import { PEAK_COUNTER_ID } from "../constants/app.constants";
const fixHeight = 55;
export default class CounterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead:
        this.props.id === PEAK_COUNTER_ID
          ? [
              "",
              "NO RF detected",
              "Y < 500",
              "500 <=Y< 1500",
              "1500 <=Y< 2500",
              "2500 <=Y< 3500",
              "3500 <=Y< 4500",
              "Y >= 4500"
            ]
          : [
              "",
              "NO RF detected",
              "Y < 50",
              "50 <=Y< 150",
              "150 <=Y< 250",
              "250 <=Y< 350",
              "350 <=Y< 450",
              "Y >= 450"
            ],
      tableTitle:
        this.props.id === PEAK_COUNTER_ID
          ? [
              "NO RF detected",
              "X < 500",
              "500 <=X< 1500",
              "1500 <=X< 2500",
              "2500 <=X< 3500",
              "3500 <=X< 4500",
              "4500 <=X< 5500",
              "5500 <=X< 6500",
              "6500 <=X< 7500",
              "7500 <=X< 8500",
              "8500 <=X< 9500",
              "9500 <=X< 10500",
              "10500 <=X< 11500",
              "11500 <=X< 12500",
              "12500 <=X< 13500",
              "13500 <=X< 14500",
              "14500 <=X< 15500",
              "15500 <=X< 16500",
              "16500 <=X< 17500",
              "17500 <=X< 18500",
              "18500 <=X< 19500",
              " X >= 19500"
            ]
          : [
              "NO RF detected",
              "X < 50",
              "50 <=X< 150",
              "150 <=X< 250",
              "250 <=X< 350",
              "350 <=X< 450",
              "450 <=X< 550",
              "550 <=X< 650",
              "650 <=X< 750",
              "750 <=X< 850",
              "850 <=X< 950",
              "950 <=X< 1050",
              "1050 <=X< 1150",
              "1150 <=X< 1250",
              "1250 <=X< 1350",
              "1350 <=X< 1450",
              "1450 <=X< 1550",
              "1550 <=X< 1650",
              "1650 <=X< 1750",
              "1750 <=X< 1850",
              "1850 <=X< 1950",
              " X >= 1950"
            ]
    };
  }

  createFlexRowArr(newTransposeArr) {
    let newFlexRowArr = [];
    newTransposeArr[0].forEach(element => {
      newFlexRowArr.push(1);
    });
    return newFlexRowArr;
  }

  createHeightRowArr(newTransposeArr) {
    let newHeightRowArr = [];
    newTransposeArr[0].forEach(element => {
      newHeightRowArr.push(fixHeight);
    });
    return newHeightRowArr;
  }

  createHeightColArr(newTransposeArr) {
    let newHeightColArr = [];
    newTransposeArr.forEach(element => {
      newHeightColArr.push(fixHeight);
    });
    return newHeightColArr;
  }

  createFlexArrForHeader(tableHead) {
    let flexArr = [];
    tableHead.forEach(element => {
      flexArr.push(1);
    });
    return flexArr;
  }

  render() {
    const { tableHead, tableTitle } = this.state;
    const whiteClrText = { color: Colors.White };
    const { newTransposeArr } = this.props;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={this.createFlexArrForHeader(tableHead)}
            style={styles.head}
            textStyle={[styles.text, whiteClrText]}
          />
        </Table>
        <ScrollView alwaysBounceVertical={false}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={this.createHeightColArr(newTransposeArr)}
                textStyle={[styles.text, whiteClrText]}
              />

              <Rows
                data={newTransposeArr}
                heightArr={this.createHeightRowArr(newTransposeArr)}
                flexArr={this.createFlexRowArr(newTransposeArr)}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    height: "100%"
  },
  head: { height: 55, backgroundColor: Colors.AnalogicBlue700 }, //"#f1f8ff"
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: Colors.AnalogicBlue700 }, //"#f1f8ff"
  row: { height: 55, backgroundColor: Colors.White },
  text: { textAlign: "center", fontSize: 10 }
});
