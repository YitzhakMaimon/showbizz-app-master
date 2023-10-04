import styled from "styled-components/native";

export const Title = styled.Text`
  font-family: Arimo-Bold;
  font-size: 22px;
  text-align: right;
  color: white;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  display: flex;
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
