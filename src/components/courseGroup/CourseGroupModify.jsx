// CourseGroupModify.jsx
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styles from '../../styles/pages/courseGroup/CourseGroupCreate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import ModifyCourseGroupCard from './ModifyCourseGroupCard';
import CourseGroupCreateModal from './CourseGroupCreateModal';
import { useParams, useNavigate } from 'react-router-dom';

const CourseGroupModify = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [courseSeqs, setCourseSeqs] = useState(new Array(4).fill(null));
  const [courses, setCourses] = useState(new Array(4).fill(null));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  useEffect(() => {
    // 그룹 데이터를 불러옴
    const fetchGroupData = async () => {
      if (!id) {
        setError('잘못된 요청입니다. ID가 없습니다.');
        return;
      }
      try {
        const response = await axiosInstance.get(`/user/group/detail/${id}`);
        console.log('Group Data:', response.data);
        const { title, courseGroupList } = response.data.courseGroup;
        setTitle(title);
        const courseSeqs = courseGroupList.map((item) => item.course.courseSeq);
        const courses = courseGroupList.map((item) => item.course); // 각 코스의 전체 데이터를 저장
        setCourses([...courses, ...new Array(4 - courses.length).fill(null)]); // 각 코스의 전체 데이터를 설정
        setCourseSeqs([
          ...courseSeqs,
          ...new Array(4 - courseSeqs.length).fill(null),
        ]);
      } catch (error) {
        console.error('Error fetching group data:', error);
        setError('그룹 데이터를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchGroupData();
  }, [id]);

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

  const handleCourseSelect = (index) => {
    setSelectedCourseIndex(index);
    setShowCourseModal(true);
  };

  const handleCourseSelection = (course) => {
    const newCourseSeqs = [...courseSeqs];
    const newCourses = [...courses];
    newCourseSeqs[selectedCourseIndex] = course.courseSeq;
    newCourses[selectedCourseIndex] = course; // 선택된 코스의 전체 데이터를 저장
    setCourseSeqs(newCourseSeqs);
    setCourses(newCourses); // 업데이트된 코스 배열 설정
    setShowCourseModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      courseSeqs: courseSeqs
        .filter((seq) => seq !== null)
        .map((seq) => ({ courseSeq: seq })),
    };
    console.log('Payload:', payload); // 디버깅용 로그
    try {
      const response = await axiosInstance.post(
        `/user/group/modify/${id}`,
        payload
      );
      console.log('Response:', response); // 디버깅용 로그
      if (response.status === 200) {
        setSuccess('그룹이 수정되었습니다');
        navigate('/mypage/courseGroup'); // 그룹 목록 페이지로 이동
      } else {
        setError('저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setError('코스 그룹 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles['create-container']}>
      <h2 className={styles['group-create-title']}>그룹 수정하기</h2>
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
              type="text"
              id="courseSeqs"
              value={courseSeqs.join(',')}
              onChange={handleCourseSeqsChange}
              readOnly
              required
              className={styles['create-courseseq-input']}
            />
            <ul className={styles['course-card-wrap']}>
              {courseSeqs.map((courseSeq, index) => (
                <li
                  key={index}
                  className={styles['course-card']}
                  onClick={() => handleCourseSelect(index)}
                >
                  <ModifyCourseGroupCard
                    key={index}
                    index={index}
                    courseSeq={courseSeq}
                    courses={courses} // courses 배열을 전달
                  />
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

export default CourseGroupModify;
