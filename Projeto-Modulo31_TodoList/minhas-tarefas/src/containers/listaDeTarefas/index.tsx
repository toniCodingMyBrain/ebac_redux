import { Tarefa } from '../../components/tarefa'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { MainContainer, Titulo } from '../../styles'

export default function ListaDeTarefas() {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      }
      if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const tarefasFiltradas = filtraTarefas()

  return (
    <main>
      <MainContainer>
        <Titulo as="p">
          {tarefasFiltradas.length > 1
            ? `${tarefasFiltradas.length} tarefas marcadas `
            : `${tarefasFiltradas.length} tarefa marcada `}
          como: &quot;
          {`${criterio}${valor === undefined ? '' : ` = ${valor}`}`}
          &quot;{' '}
          {termo !== undefined && termo.length > 0 ? ` e "${termo}"` : ``}
        </Titulo>
        <ul>
          {tarefasFiltradas.map((tarefa) => (
            <li key={tarefa.titulo}>
              <Tarefa
                id={tarefa.id}
                titulo={tarefa.titulo}
                descricao={tarefa.descricao}
                prioridade={tarefa.prioridade}
                status={tarefa.status}
              />
            </li>
          ))}
        </ul>
      </MainContainer>
    </main>
  )
}
