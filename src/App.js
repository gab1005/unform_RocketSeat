import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';

//const initialData = {
//  email: 'gabriel@gmail.com',
//  address: {
//    city: 'Fortaleza',
//  }
//}

// forma padrão de definir atributos de um úsuario
//const user = {
//  name: 'gabriel',
//  email: 'gabriel@gmail.com',
//  address: {
//    street: "Rua teste",
//    number: 123,
//  }
//}


//useRef (from react) tem como principal função trabalhar com o 
//envio de erro para o úsuario quando o campo não é preenchido apropriadamente
function App() {
  const formRef = useRef(null);


  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),

        email: Yup
          .string()
          .email('Digite um e-mail valido')
          .required('E-mail obrigatório'),

        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo, 3 caracteres')
            .required('A cidade é obrigatoria'),

        })
      })

      //o abortEarly (from Yup) vem por padrão como  true, essa atualiza as mensagens de erro para cada campo prenchido
      //como o foco é mandar o reçatório de erro completo, cancêlamos essa propriedade.
      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      //a linha a baixo serve para limpar as mensagens de erro, que ficam salvas por padrão no Yup
      //mesmo após ser  enviado com sucesso os dados.
      formRef.current.setErrors({});

      //limpar campos de envio, apos o submit
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
    //o catch do modo acima, irá alertar apenas erros de vaidação do Yup.
  }

  //se utilizaria o useState e o initialdata para trabalhar com essas informações do usuario
  //porém como não esta salvo de forma estatica, usamos no lugar o formRef.current.data
  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: "Gabriel de Sousa",
        email: "gabriel@gmail.com",
        address: {
          city: 'Fortaleza',
        }
      })
    }, 2000)
  }, [])

  return (
    <div className="App">
      <h1>Hello World</h1>

      <Form ref={formRef} onSubmit={handleSubmit} >
        <Input name="name" />
        <Input name="email" />

        {/**<Input type="password" name="password" />*/}

        {/**o Scope (from @unform/core) define o indice antes de cada indice definido 
         * nos atributos dos Inputs abaixo, poupando escrita */}

        <Scope path="address" >
          <Input name="street" />
          <Input name="neighborhood" />
          <Input name="city" />
          <Input name="state" />
          <Input name="number" />
        </Scope>

        <button type='submit'>Enviar</button>
      </Form>
    </div>
  );
}

export default App;
