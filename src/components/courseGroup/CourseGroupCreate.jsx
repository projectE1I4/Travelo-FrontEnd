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
import CourseGroupCreateModal from './CourseGroupCreateModal';
import { useNavigate } from 'react-router-dom';

const CourseGroupCreate = () => {
  const [title, setTitle] = useState('');
  const [courseSeqs, setCourseSeqs] = useState(new Array(4).fill(null));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCourseSeqsChange = (e) => {
    const seqs = e.target.value.split(',').map(Number);
    setCourseSeqs(seqs);
  };

  const handleCourseSelect = (index) => {
    setSelectedCourseIndex(index);
    setShowCourseModal(true);
  };

  const handleCourseSelection = (course) => {
    const newCourseSeqs = [...courseSeqs];
    newCourseSeqs[selectedCourseIndex] = course;
    setCourseSeqs(newCourseSeqs);
    setShowCourseModal(false);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/group/create', {
        title,
        courseSeqs: courseSeqs.filter((seq) => seq !== null),
      });

      if (response.status === 200) {
        setSuccess('그룹이 등록되었습니다');
        setTitle('');
        setCourseSeqs(new Array(4).fill(null));

        navigate('/mypage/CourseGroup');
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

          <div className={styles['form-group-course']}>
            <input
              type="hidden"
              id="courseSeqs"
              value={courseSeqs.join(',')}
              onChange={handleCourseSeqsChange}
              readOnly
              required
              className={styles['create-courseseq-input']}
            />
            <ul className={styles['course-card-wrap']}>
              {courseSeqs.map((course, index) => (
                <li
                  key={index}
                  className={styles['course-card']}
                  onClick={() => handleCourseSelect(index)}
                >
                  <CourseGroupCard key={index} index={index} course={course} />
                </li>
              ))}
            </ul>
          </div>
          {error && <p className={styles['error']}>{error}</p>}
          {success && <p className={styles['success']}>{success}</p>}
        </form>
        <CourseGroupCreateModal
          show={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          onSelectCourse={handleCourseSelection}
        />
      </div>
    </div>
  );
};

export default CourseGroupCreate;
