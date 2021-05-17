import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name)
  //fieldName: vai ser o nome fianl do objeto criado, considerando seus indeces interligados
  //ex: curso.modulo.aula >>> React.Views.aula01

  //registerField: é disparado quando os dados do formulario estao prontos

  //unform >>> uncontroler-form >>> não salvar os dados enquanto são digitados, melhorando a performace, logo...
  //não se útiliza o código a baixo, por exemplo:
  // retunr (
  //  <input onChange={e => e.target.value}  />
  //);
  //pelo fato de que o onChange salva cada dado digitado, o que prejudica a performace

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && <span style={{ color: '#f00' }} > {error} </span>}
    </div>
  );
}