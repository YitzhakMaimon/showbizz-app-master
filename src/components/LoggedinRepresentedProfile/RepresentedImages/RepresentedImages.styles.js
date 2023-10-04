import styled from "styled-components/native";

export const ScrollableImagesContainer = styled.ScrollView``;

export const Container = styled.View``;

export const ImageUploadContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  height: 82px;
  background: #171717;
  padding-top: 27px;
  margin-top: 41px;
`;

export const ImageUploadIconContainer = styled.View`
  position: absolute;
  display: flex;
  background: #000000;
  width: 31px;
  height: 31px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  top: -14.5px;
`;

export const UserImagesContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -1.33%;
`;

export const Image = styled.Image`
  height: 180px;
  flex: 0 32%;
  border-radius: 2px;
  margin-top: 3px;
`;

export const ImageButton = styled.TouchableOpacity`
  height: 180px;
  flex: 0 32%;
  border-radius: 2px;
  margin-top: 3px;
  display: flex;
  background: #171717;
  margin-right: 1.33333%;
`;
