import React from "react";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 50px;
`;
const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;
const Content = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;
const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  padding-left: 20px;
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;
const OverView = styled.p`
  font-size: 12px;
  line-height: 1.5;
  width: 70%;
  opacity: 0.7;
  margin-bottom: 40px;
`;

const ItemContainer = styled.div`
  ::-webkit-scrollbar {
    width: 0px; /* remove scrollbar space */
    background: transparent; /* optional: just make scrollbar invisible */
  }
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;
const SubContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 25%;
  margin-bottom: 20px;
  /* because scrollbar cut marginbottom */
  &:last-child {
    margin-bottom: 220px;
  }
`;
const SLink = styled(Link)`
  height: 100%;
  width: 30%;
`;
const SubPoster = styled.div`
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  height: 100%;
`;

const SubInfo = styled.div`
  width: 70%;
  padding-left: 10px;
`;
const Subtitle = styled.span`
  font-size: 15px;
  font-weight: 300;
`;
const SubOverView = styled.p`
  margin-top: 20px;
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.7;
`;
const Year = styled.span`
  font-size: 12px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;
const CollectionPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <>
      {" "}
      <Helmet>
        <title>Collection | Nomflix</title>
      </Helmet>
      <Container>
        <BackDrop
          bgUrl={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgUrl={`https://image.tmdb.org/t/p/original${result.poster_path}`}
          />
          <Data>
            <Title>{result.name}</Title>
            <OverView>{result.overview}</OverView>{" "}
            <ItemContainer>
              {result.parts &&
                result.parts.length > 0 &&
                result.parts.map((part, index) => (
                  <SubContainer>
                    <SLink to={`/movie/${part.id}`}>
                      <SubPoster
                        bgUrl={
                          part.poster_path
                            ? `https://image.tmdb.org/t/p/w300${
                                part.poster_path
                              }`
                            : require("../../assets/default_cover.jpg")
                        }
                      />
                    </SLink>
                    <SubInfo>
                      <Subtitle>{part.title}</Subtitle>
                      <Divider>•</Divider>
                      <Year>{part.release_date.substr(0, 4)}</Year>
                      <SubOverView>
                        {part.overview.length > 500
                          ? `${part.overview.substr(0, 500)}...`
                          : part.overview}
                      </SubOverView>
                    </SubInfo>
                  </SubContainer>
                ))}
            </ItemContainer>
          </Data>
        </Content>
      </Container>
    </>
  );
export default CollectionPresenter;
