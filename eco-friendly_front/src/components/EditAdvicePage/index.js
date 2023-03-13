/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  OnInputChange,
  removeErrorMessages,
  toggleIsPublished,
  toggleIsSaved,
} from '../../actions/common';
import {
  editAdviceData,
  userPublishEditAdvice,
  userSaveEditAdvice,
} from '../../actions/advices';

import Page from '../Page';
import Input from '../Field/Input';
import Button from '../Button';
import RichTextEditor from '../RichTextEditor';
import Loader from '../Loader';

import { findItem } from '../../utils';

import './styles.scss';

function EditAdvicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  /* Check if user is logged */
  const userIslogged = useSelector((state) => state.user.isLogged);
  /* If there is no advice, we redirect to the 404 page */
  useEffect(() => {
    if (!userIslogged) {
      navigate('/', { replace: true });
    }
  }, [userIslogged]);
  /* End check if user is logged */

  /* Check the advice in the user advices list */
  const advice = useSelector((state) =>
    findItem(state.advices.userAdvices, slug),
  );
  /* if there is no advice, we redirect to the 404 page */
  useEffect(() => {
    if (!advice) {
      navigate('/404', { replace: true });
    }
    dispatch(editAdviceData(advice));
  }, [advice]);

  /* get categories */
  const categories = useSelector((state) => state.common.categories);

  /* control input fields */
  const title = useSelector((state) => state.advices.editAdviceTitle);
  const category = useSelector((state) => state.advices.editAdviceCategory);
  const content = useSelector((state) => state.advices.editAdviceContent);

  const changeField = (value) => {
    dispatch(OnInputChange(value, 'editAdviceTitle'));
  };
  const onSelectChange = (e) => {
    dispatch(OnInputChange(e.target.value, 'editAdviceCategory'));
  };
  const OnRichTextEditorChange = (e) => {
    dispatch(OnInputChange(e, 'editAdviceContent'));
  };
  /* End control input fields */

  /* Get the button name clicked */
  const [buttonName, setButtonName] = useState(null);

  /* Get user nickname */
  const userNickname = useSelector((state) => state.user.nickname);

  /* submit form */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeErrorMessages());

    if (buttonName === 'publish') {
      dispatch(userPublishEditAdvice());
    }
    if (buttonName === 'save') {
      dispatch(userSaveEditAdvice());
    }
    if (buttonName === 'cancel') {
      dispatch(OnInputChange('', 'editAdviceTitle'));
      dispatch(OnInputChange('', 'editAdviceCategory'));
      dispatch(OnInputChange('', 'editAdviceContent'));
      navigate(`/utilisateurs/${userNickname}`, { replace: true });
    }
  };

  /* Check if advice is published (USER_PUBLISH_NEW_ADVICE_SUCCES) */
  const isPublished = useSelector((state) => state.advices.isPublished);

  if (isPublished) {
    dispatch(toggleIsPublished());
    navigate(`/utilisateurs/${userNickname}`, { replace: true });
  }

  /* Check if advice is saved (USER_SAVE_NEW_ADVICE_SUCCES) */
  const isSaved = useSelector((state) => state.advices.isSaved);

  if (isSaved) {
    dispatch(toggleIsSaved());
    navigate(`/utilisateurs/${userNickname}`, { replace: true });
  }

  /* Check for messages */
  const [haveMessages, setHaveMessages] = useState(false);

  const errorMessages = useSelector((state) => state.advices.errorMessages);

  useEffect(() => {
    if (errorMessages && errorMessages.length > 0) {
      setHaveMessages(true);
    }
  }, [errorMessages]);

  return (
    <Page>
      {advice ? (
        <div className="add-advice">
          <div className="title">Editer un conseil</div>
          {haveMessages && (
            <div className="messages error-messages">
              <ul>
                {errorMessages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <form autoComplete="off" onSubmit={handleSubmit} method="POST">
            <div className="row">
              <select
                onChange={onSelectChange}
                value={category}
                className="advice-select"
              >
                <option hidden>Catégories</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <Input
                type="text"
                name="addTitle"
                placeholder="Titre"
                onChange={changeField}
                value={title}
                color="primary"
              />
            </div>
            <div className="text-editor">
              <RichTextEditor
                name="addContent"
                value={content}
                onChange={OnRichTextEditorChange}
              />
            </div>
            <div className="button-wrapper">
              <Button
                type="submit"
                color="primary"
                onclick={() => setButtonName('publish')}
              >
                Publier
              </Button>
              <Button type="submit" onclick={() => setButtonName('save')}>
                Sauvegarder
              </Button>
              <Button
                type="submit"
                outline
                color="primary"
                onclick={() => setButtonName('cancel')}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </Page>
  );
}

export default EditAdvicePage;
