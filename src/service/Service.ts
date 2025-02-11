import axios from "axios";

const api = axios.create({
 baseURL: "https://projeto-crm.onrender.com/"
});

export const cadastrarUsuario = async (
  url: string,
  dados: object,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const login = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};
export const cadastrar = async (
  url: string,
  dados: object,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function,
  header: object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: object,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function,
  header: object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};
export const deletar = async (url: string, header: object) => {
  await api.delete(url, header);
};

export const verificarConvenio = async (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data.convenio);
};

export const atualizarConvenio = async (
  url: string,
  dados: object,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setDados: Function,
  header: object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data.convenio);
};
