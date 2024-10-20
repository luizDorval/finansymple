import useAuth from '../../hooks/useAuth';
import Card from '../Card';
import './styles.css';

const CardsContainer = () => {
  const { auth } = useAuth();

  return (
    <section className="cards-container">
      <Card
        className="card"
        name="Receitas"
        value={
          !auth?.filteredOperations
            ? auth?.operations
                ?.filter((operation) => {
                  return operation.type === 'receita';
                })
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
            : auth?.filteredOperations
                ?.filter((operation) => {
                  return operation.type === 'receita';
                })
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
        }
        type={1}
      />
      <Card
        className="card"
        name="Despesas"
        value={
          !auth?.filteredOperations
            ? auth?.operations
                ?.filter((operation) => {
                  return operation.type === 'despesa';
                })
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
            : auth?.filteredOperations
                ?.filter((operation) => {
                  return operation.type === 'despesa';
                })
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
        }
        type={0}
      />
      <Card
        className="card total"
        name="Total"
        value={
          !auth?.filteredOperations
            ? auth?.operations
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
            : auth?.filteredOperations
                ?.map((operation) => {
                  return Number(operation.value);
                })
                ?.reduce((accumulator, current) => {
                  return accumulator + current;
                }, 0)
        }
        type={2}
      />
    </section>
  );
};

export default CardsContainer;
