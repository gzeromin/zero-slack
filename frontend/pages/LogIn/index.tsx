import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';

function LogIn() {
  const { data, error, mutate } = useSWR('/api/users', fetcher);
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setLogInError(false);
    axios.post(
      '/api/users/login',
      { email, password },
      { withCredentials: true }
    ).then((response) => {
      console.log(response);
      //revalidate(); // swr 실행
      mutate(response.data, false);
    }).catch((error) => {
      setLogInError(error.response?.data?.statusCode === 401);
    });
  }, [email, password]);

  if(data === undefined) {
    return <div>Loading..</div>
  }

  if(data) {
    return <Redirect to="/workspace/sleact/channel/common" />
  }

  // console.log(error, userData);
  // if(!error && userData) {
  //   console.log('Logined', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />
  // }


  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>email</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>password</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          { logInError && <Error>Fail</Error>}
        </Label>
        <Button type="submit">login</Button>
      </Form>
      <LinkContainer>
        If you are not member yet...&nbsp;
        <Link to="/signup">go to sign up</Link>
      </LinkContainer>
    </div>
  )
}

export default LogIn;