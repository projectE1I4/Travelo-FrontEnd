import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from '../../styles/pages/courseGroup/CourseGroupCreate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faMap,
  faMapLocationDot,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import CourseGroupCard from './CourseGroupCard';

const CourseGroupCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseSeqs, setCourseSeqs] = useState(new Array(4).fill(null));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCourseSeqsChange = (e) => {
    const seqs = e.target.value.split(',').map(Number);
    setCourseSeqs(seqs);
  };

  const handleCourseSelect = (index, course) => {
    const newCourseSeqs = [...courseSeqs];
    newCourseSeqs[index] = course;
    setCourseSeqs(newCourseSeqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(' /user/group/create', {
        title,
        description,
        courseSeqs: courseSeqs.filter((seq) => seq !== null),
      });

      if (response.status === 200) {
        setSuccess('그룹이 등록되었습니다');
        setTitle('');
        setDescription('');
        setCourseSeqs(new Array(4).fill(null));
      }
    } catch (error) {
      setError('코스 그룹 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles['create-container']}>
      <h2 className={styles['group-create-title']}>그룹 생성하기</h2>
      <div className={styles['create-wrap']}>
        <form onSubmit={handleSubmit} className={styles['create-form']}>
          <div className={styles['form-group-title']}>
            <label htmlFor="title">
              <FontAwesomeIcon
                icon={faMapLocationDot}
                className={styles['create-title-icon']}
              />
              그룹명
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={styles['form-group-title-input']}
              required
            />
            <button
              type="submit"
              className={styles['form-group-submit-button']}
            >
              저장
            </button>
          </div>
          <div className={styles['form-group-description']}>
            <label htmlFor="description">
              <FontAwesomeIcon
                icon={faComment}
                className={styles['create-description-icon']}
              />{' '}
              그룹 설명
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
              className={styles['form-group-description-input']}
            />
          </div>
          <div className={styles['form-group-course']}>
            <input
              type="text"
              id="courseSeqs"
              value={courseSeqs.join(',')}
              onChange={handleCourseSeqsChange}
              required
              className={styles['create-courseseq-input']}
            />
            <ul className={styles['course-card-wrap']}>
              <li
                className={styles['course-card']}
                onSelectCourse={handleCourseSelect}
              >
                <div className={styles['card-number']}>1</div>
                <div className={styles['card-content']}>
                  <div className={styles['unfilled']}>
                    <FontAwesomeIcon
                      icon={faMap}
                      className={styles['unfilled-icon1']}
                    />
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={styles['unfilled-icon2']}
                    />
                  </div>
                </div>
              </li>
              <li
                className={styles['course-card']}
                onSelectCourse={handleCourseSelect}
              >
                <CourseGroupCard
                  key={index}
                  index={index}
                  onSelectCourse={handleCourseSelect}
                />
              </li>
              <li
                className={styles['course-card']}
                onSelectCourse={handleCourseSelect}
              >
                <div className={styles['card-number']}>3</div>
                <div className={styles['card-content']}>
                  <div className={styles['unfilled']}>
                    <FontAwesomeIcon
                      icon={faMap}
                      className={styles['unfilled-icon1']}
                    />
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={styles['unfilled-icon2']}
                    />
                  </div>
                </div>
              </li>
              <li
                className={styles['course-card']}
                onSelectCourse={handleCourseSelect}
              >
                <div className={styles['card-number']}>4</div>
                <div className={styles['card-content']}>
                  <div className={styles['unfilled']}>
                    <FontAwesomeIcon
                      icon={faMap}
                      className={styles['unfilled-icon1']}
                    />
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={styles['unfilled-icon2']}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {error && <p className={styles['error']}>{error}</p>}
          {success && <p className={styles['success']}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CourseGroupCreate;
