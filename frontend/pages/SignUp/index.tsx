import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import useSWR from 'swr';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import { Link, Redirect } from 'react-router-dom';

function SignUp() {
  const { data, error, revalidate } = useSWR('/api/users', fetcher);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setMismatchError(e.target.value !== passwordCheck);
  }, [passwordCheck]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(!mismatchError && nickname) {
      console.log('sign up by server');
      setSignUpError('');
      setSignUpSuccess(false);
      axios.post(
        '/api/users',
        { email, nickname, password }
      ).then((response) => {
        console.log(response);
        setSignUpSuccess(true);
      }).catch((error) => {
        console.log(error.response);
        setSignUpError(error.response.data.data);
      }).finally(() => {});
    }
  }, [email, nickname, password, passwordCheck, mismatchError]);

  if(data === undefined) {
    return <div>Loading..</div>
  }
  
  if(data) {
    return <Redirect to="/workspace/channel" /> //return은 항상 hooks 아래에 있어야 한다.
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
        <Label id="nickname-label">
          <span>nickname</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>password</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>password check</span>
          <div>
            <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
          </div>
          { mismatchError && <Error>password and passwordcheck are mismatch!</Error>}
          { !nickname && <Error>please input nickname</Error>}
          { signUpError && <Error>{ signUpError }</Error>}
          { signUpSuccess && <Error>you have signed up. please login</Error>}
        </Label>
        <Button type="submit">sign up</Button>
      </Form>
      <LinkContainer>
        If you are already member...&nbsp;
        <Link to="/login">go to login</Link>
      </LinkContainer>
    </div>
  )
}

export default SignUp;