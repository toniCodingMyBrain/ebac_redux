import BotaoAdicionar from '../../components/BotaoAdd'
import BarraLateral from '../../containers/barraLateral'
import ListaDeTarefas from '../../containers/listaDeTarefas'

const Home = () => {
  return (
    <>
      <BarraLateral mostrarFiltros={true} />
      <ListaDeTarefas />
      <BotaoAdicionar />
    </>
  )
}

export default Home
