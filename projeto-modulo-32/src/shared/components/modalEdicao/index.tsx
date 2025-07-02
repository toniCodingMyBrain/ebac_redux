import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { modifyDialog } from "../../services/reducers/dialog";
import { useUpdadeContatoMutation } from "../../services/api";
import { obterContato } from "../../services/reducers/contatos";

// ToDo: implementar lista de números de telefones. Para que possa ser adicionado mais de um.
//? Isso pode ser feito utilizando um botão de + ao lado.
// ToDo: colocar botões de mudança de status, acima do input, sendo:
//* estrela para favorito.
//* losango ou um icone de enfermagem para indicar contato de emergência.
//* e o padrão normal caso não marque nenhum.
//* isto deve automaticamente modificar a mensagem, sendo a mais forte a de emergência.
// ToDo: adicionar biblioteca Toastify para renderizar mensagens de feedback das funções.

function ModalEdicao() {
  const setIsOpen: boolean = useAppSelector((state) => state.dialog.isOpen);
  const getContato = useAppSelector((state) => state.contatos.contato);
  const dispatch = useAppDispatch();
  const [updateContato] = useUpdadeContatoMutation();

  const [thisName, setThisName] = React.useState(getContato.nome);
  const [thisEmail, setThisEmail] = React.useState(getContato.email);
  const [thisNumber, setThisNumber] = React.useState(getContato.telefone);

  const toUpdateContato = {
    id: getContato.id,
    nome: thisName,
    email: thisEmail,
    telefone: thisNumber,
    categoriaId: getContato.categoriaId,
  };

  const updateHandler = async () => {
    await updateContato(toUpdateContato);
  };

  const catContato = (catId: string | number | undefined) => {
    if (catId === 1) {
      return `Contato normal.`;
    } else if (catId === 2) {
      return `Contato favorito.`;
    } else {
      return `Contato de emergência.`;
    }
  };

  const cancelHandler = () => {
    updateContato(getContato);
    dispatch(modifyDialog(false));
  };

  return (
    <React.Fragment>
      <Dialog
        open={setIsOpen}
        onClose={() => dispatch(modifyDialog(false))}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(obterContato(toUpdateContato));
            console.log(toUpdateContato);
            updateHandler();
            dispatch(modifyDialog(false));
            window.scrollTo(0, 0);
          },
        }}
      >
        <DialogTitle color="primary">Atualize este contato</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <InputLabel htmlFor="component-outlined">Nome</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue={getContato.nome}
                label="Nome"
                onChange={(e) => {
                  setThisName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">E-Mail</InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue={getContato.email}
                label="E-mail"
                onChange={(e) => {
                  setThisEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Telefone{` (s)`}
              </InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue={getContato.telefone}
                label="Telefone"
                onChange={(e) => {
                  setThisNumber(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">
                Categoria do contato
              </InputLabel>
              <OutlinedInput
                id="component-outlined"
                defaultValue={catContato(getContato.categoriaId)}
                label="Contato normal"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={cancelHandler}>
            Cancelar
          </Button>
          <Button type="submit">Concluir</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ModalEdicao;
