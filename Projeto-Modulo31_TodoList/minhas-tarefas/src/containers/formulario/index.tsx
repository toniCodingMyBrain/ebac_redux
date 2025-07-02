import { FormEvent, useState } from 'react'
import { Campo, MainContainer, SaveButton, Titulo } from '../../styles'
import { Form, Opcoes, Opcao } from './Styles'
import { useDispatch } from 'react-redux'
import * as enums from '../../utils/enums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'
import { useNavigate } from 'react-router-dom'

const Formulario = () => {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova Tarefa</Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          type="text"
          placeholder="Título"
        />
        <Campo
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Opcoes>
          <p>Prioridade</p>
          {/* Versão javascript preenchido dinâmicamente */}
          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                onChange={(evento) =>
                  setPrioridade(evento.target.value as enums.Prioridade)
                }
                name="prioridade"
                type="radio"
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
              />{' '}
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
          {/*
            Versão html.
          <input type="radio" name="prioridade" id="urgente" />
          <label htmlFor="urgente">Urgente</label>
          <input type="radio" name="prioridade" id="importante" />
          <label htmlFor="importante">Importante</label>
          <input type="radio" name="prioridade" id="normal" />
          <label htmlFor="normal">Normal</label> */}
        </Opcoes>
        <SaveButton type="submit">Cadastrar</SaveButton>
      </Form>
    </MainContainer>
  )
}

export default Formulario
