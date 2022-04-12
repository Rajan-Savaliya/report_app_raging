import React from "react";
import { View, Dimensions, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import styled from "styled-components/native";

import { stoneValueChangeAction } from "../../../redux/actions/authActons";

const SliderWrapper = styled.View`
  margin: 10px 5px 0px 5px;
  width: ${Dimensions.get("window").width / 2}px;
  height: 300px;
  justify-content: flex-start;
  align-items: center;
`;

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`;
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  width: ${Dimensions.get("window").width / 2}px;
`;

const LabelWrapper2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px 0px 0px;
  width: ${Dimensions.get("window").width / 2}px;
`;

const LabelText = styled.Text`
  font-size: 20px;
  text-align: center;
`;

const StoneValue = () => {
  const dispatch = useDispatch();
  const { stoneValue } = useSelector((state) => state.authState);

  const multiSliderValuesChange = (values) => {
    dispatch(stoneValueChangeAction(values));
  };

  return (
    <ViewContainer>
      <SliderWrapper>
        <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 30,
                width: 30,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
              },
              android: {
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: "#cd9b46",
              },
            }),
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: "#cd9b46",
              },
            }),
          }}
          selectedStyle={{
            backgroundColor: "#cd9b46",
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[stoneValue[0], stoneValue[1]]}
          sliderLength={Dimensions.get("window").width / 2}
          onValuesChange={multiSliderValuesChange}
          min={0}
          max={40}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
        <LabelWrapper2>
          <View style={{}}>
            <LabelText>From </LabelText>
          </View>
          <View style={{}}>
            <LabelText>To</LabelText>
          </View>
        </LabelWrapper2>

        <LabelWrapper>
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              borderColor: "#cd9b46",
              borderWidth: 1,
              alignSelf: "center",
            }}
          >
            <LabelText>{stoneValue[0]} </LabelText>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              borderColor: "#cd9b46",
              borderWidth: 1,
              alignSelf: "center",
            }}
          >
            <LabelText>{stoneValue[1]}</LabelText>
          </View>
        </LabelWrapper>
      </SliderWrapper>
    </ViewContainer>
  );
};

export default StoneValue;
