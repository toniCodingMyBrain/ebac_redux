import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './styles'
import { alteraStatus, editar, remover } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { Button, SaveButton } from '../../styles'
import * as enums from '../../utils/enums/Tarefa'

export type Props = TarefaClass

export const Tarefa = ({
  titulo,
  prioridade,
  status,
  descricao: descricaoOriginal,
  id
}: Props) => {
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescription(descricaoOriginal)
    }
  }, [descricaoOriginal])

  const cancelarEdicao = () => {
    setEdit(false)
    setDescription(descricaoOriginal)
  }

  const salvarEdicao = () => {
    dispatch(
      editar({
        id,
        titulo,
        prioridade,
        status,
        descricao: description
      })
    )
    setEdit(false)
  }

  const alteraStatusTarefa = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      alteraStatus({
        id,
        finalizado: event.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Title>
          {edit && <em>Editando: </em>}
          {titulo}
        </S.Title>
      </label>
      <S.Tag parametro={'prioridade'} prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro={'status'} status={status}>
        {status}
      </S.Tag>
      <S.Description
        disabled={!edit}
        value={description}
        onChange={(evento) => setDescription(evento.target.value)}
      />
      <S.BarraAcoes>
        {edit ? (
          <>
            <SaveButton onClick={salvarEdicao}>Salvar</SaveButton>
            <S.NegativeButton onClick={cancelarEdicao}>
              Cancelar
            </S.NegativeButton>
          </>
        ) : (
          <>
            <Button onClick={() => setEdit(true)}>Editar</Button>
            <S.NegativeButton onClick={() => dispatch(remover(id))}>
              Remover
            </S.NegativeButton>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}
