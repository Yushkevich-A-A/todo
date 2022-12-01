import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'components/elements/Row';
import { ru } from 'date-fns/locale';
import { setDefaultOptions, formatDistance, format  } from 'date-fns';
setDefaultOptions({locale: ru});

function Times(props) {
  const { task, project, sendData } = props;
  const [ inWork, setInWork] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setInWork(formatDistance( new Date(), task.create_date, { locale: ru }))
    }, 1000)
    return () => {
      clearInterval(interval);
    }
  }, [])


  return (
    <Row type='between'>
      <div>Время в работе {formatDistance( new Date(), task.create_date, { locale: ru })}</div>
      <div>Выполнить до {format(task.finish_date, 'dd MMMM yyyy')}</div>
    </Row>
  )
}

Times.propTypes = {}

export default Times
