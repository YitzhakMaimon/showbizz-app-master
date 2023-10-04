import styled from "styled-components/native";

export const Title = styled.Text`
  font-family: Arimo-Bold;
  font-size: 22px;
  text-align: right;
  color: white;
`;

export const Container = styled.View`
  flex: 1;
  display: flex;
`;

export const ProfileImageText = styled.Text`
  font-family: Arimo;
  font-size: 15px;
  color: #aeaeae;
  margin-top: 13px;
`;

export const ProfileImageContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  margin-top: 31px;
`;

export const PostDataContainer = styled.ScrollView`
  padding-right: 5%;
  padding-left: 5%;
`;
