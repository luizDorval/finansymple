import CardsContainer from '../../components/CardsContainer';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import NewOperation from '../../components/NewOperation';
import Table from '../../components/Table';

const Home = () => {
  return (
    <div className="home">
      <Modal />
      <Header />
      <Container>
        <>
          <CardsContainer />
          <NewOperation />
          <Table />
        </>
      </Container>
    </div>
  );
};

export default Home;
