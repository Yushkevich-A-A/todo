import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/elements/Row';
import styled from 'styled-components';
import { ru } from 'date-fns/locale';
import { setDefaultOptions, formatDistance, format } from 'date-fns';
import Input from 'components/elements/Input';
import { useDispatch } from 'react-redux';
import { parse } from 'date-fns/esm';
setDefaultOptions({locale: ru});

const BlockTime = styled.div`
  width: 50%;
  padding-left: 15px;
  padding-right: 15px
`

const TitleTime = styled.div`
  max-width: 200px;
  width: 100%;
`
const FinalDate = styled.div``;

const DateBlock = styled.div`;
    font-size: 14px;
    font-weight: 400;
    padding: 6px 5px;
    color: #172b4d;
`

function Times(props) {
  const { task  } = props;
  const [ inWork, setInWork] = useState(formatDistance( new Date(), task.create_date, { locale: ru }));
  const dispatch = useDispatch();
  const [ open , setOpen] = useState(false);
  const [ date , setDate] = useState('');

  useEffect(() => {
    setDate(format( task.finish_date || new Date(), 'yyyy-MM-dd') )
    const interval = setInterval(() => {
      setInWork(formatDistance( new Date(), task.create_date, { locale: ru }))
    }, 1000)
    return () => {
      clearInterval(interval);
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!task.finish_date) {
      setDate(format( new Date(), 'yyyy-MM-dd'));
      return; 
    }
    setDate(format( task.finish_date, 'yyyy-MM-dd'));
  }, [task])

  const handleClick = () => {
    setOpen( state => !state );
  }

  const handleChadge = (e) => {
    setDate(e.target.value);
  }

  const handleBlur = () => {
    handleClick();
    const dateparse = parse(date, 'yyyy-MM-dd', new Date()).getTime();

    dispatch({ type: "CHANGE_FINAL_DATA_SAGA", payload: {
      finish_date: dateparse,
      id_project: task.id_project,
      id_task: task.id
    }})
  }


  return (
    <Row type='around'>
      <BlockTime >
        <TitleTime>В работе:</TitleTime>
        <DateBlock>{inWork}</DateBlock>
      </BlockTime>
      <BlockTime >
        <TitleTime>Выполнить до </TitleTime> 
        <label htmlFor="date">
          {
            !open && <FinalDate onClick={handleClick}>
              { task.finish_date && <DateBlock>{format(task.finish_date, 'dd MMMM yyyy')}</DateBlock> }
              { !task.finish_date && <DateBlock>Выберите дату</DateBlock> }
            </FinalDate>
          }
          {
            open && <Input value={date} type='date' name='date' handleChange={handleChadge} handleOnBlur={handleBlur} />
          }
        </label>  
      </BlockTime>
    </Row>
  )
}

Times.propTypes = {
  task: PropTypes.object.isRequired,
}

export default Times
