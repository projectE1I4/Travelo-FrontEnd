import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CourseGroupContext } from '../../contexts/CourseGroupContext';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/pages/courseGroup/CourseGroupDetail.module.css';

const CourseGroupDetail = () => {
  const { id } = useParams();
  const { courseGroup, fetchCourseGroupDetail, loading, error } =
    useContext(CourseGroupContext);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 이미지 인덱스를 따로 관리
  const triangleRef = useRef(null);

  useEffect(() => {
    fetchCourseGroupDetail(id);
  }, [id, fetchCourseGroupDetail]);

  useEffect(() => {
    if (courseGroup && courseGroup.courseGroupList) {
      setSelectedCourse(courseGroup.courseGroupList[0].course); // 초기 선택된 코스를 첫 번째 항목으로 설정
      setSelectedIndex(0); // 초기 인덱스를 0으로 설정
      setSelectedImageIndex(0);
      document.documentElement.style.setProperty(
        '--active-width',
        getLineWidth(0)
      );
    }
  }, [courseGroup]);

  useEffect(() => {
    if (courseGroup && courseGroup.courseGroupList) {
      const findFirstImage = (courseList) => {
        for (let i = 0; i < courseList.length; i++) {
          if (courseList[i].course.courseList.length > 0) {
            const place = courseList[i].course.courseList[0].place;
            if (place.imageFile1) {
              return { image: place.imageFile1, index: i };
            }
          }
        }
        return null;
      };

      const firstImage = findFirstImage(courseGroup.courseGroupList);
      if (firstImage) {
        setSelectedImageIndex(firstImage.index);
        document.documentElement.style.setProperty(
          '--active-width',
          getLineWidth(selectedIndex)
        );
      } else {
        setSelectedImageIndex(0);
        document.documentElement.style.setProperty(
          '--active-width',
          getLineWidth(selectedIndex)
        );
      }
    }
  }, [courseGroup]);

  const handleImageClick = (index) => {
    setSelectedCourse(courseGroup.courseGroupList[index].course);
    setSelectedIndex(index);
    document.documentElement.style.setProperty(
      '--active-width',
      getLineWidth(index)
    );
  };
  console.log(courseGroup);

  const getLineWidth = (index) => {
    const totalItems = courseGroup.courseGroupList.length;
    if (totalItems === 2) {
      if (index === 0) return '27%';
      if (index === 1) return '100%';
    } else if (totalItems === 3) {
      if (index === 0) return '15%';
      if (index === 1) return '50%';
      if (index === 2) return '100%';
    } else if (totalItems === 4) {
      if (index === 0) return '10%';
      if (index === 1) return '40%';
      if (index === 2) return '60%';
      if (index === 3) return '100%';
    }
    return '0%';
  };

  useEffect(() => {
    if (triangleRef.current && selectedIndex !== null) {
      const activeImage = document.querySelector(
        `.${styles['imageItem']}.${styles['Dactive']}`
      );
      if (activeImage) {
        const imageRect = activeImage.getBoundingClientRect();
        const parentRect = activeImage.parentElement.getBoundingClientRect();
        const leftPosition =
          imageRect.left + imageRect.width / 2 - parentRect.left - 45;

        triangleRef.current.style.left = `${leftPosition}px`;
      }
    }
  }, [selectedIndex, courseGroup]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!courseGroup) return <div>No data available</div>;

  return (
    <div className={styles['group-box']}>
      <h2 className={styles['group-detail-title']}>그룹 상세보기</h2>
      <div>
        <div className={styles['detail-group-title-wrap']}>
          <h2>
            <FontAwesomeIcon icon={faMapLocationDot} />
            {courseGroup.title}
          </h2>
        </div>
        <div className={styles['detail-group-card']}>
          <div className={styles['detail-modify-btn-wrap']}>
            <button type="button">
              <Link to={`/courseGroup/modify/${id}`}>수정</Link>
            </button>
          </div>
          <div
            className={`${styles['numberSlider']} ${styles.Dactive}`}
            style={{ '--active-index': selectedIndex + 1 }}
          >
            {courseGroup.courseGroupList.map((_, index) => (
              <div
                key={index}
                className={`${styles['numberItem']} ${selectedIndex >= index ? styles.Dactive : ''}`}
                onClick={() => handleImageClick(index)}
              >
                {index + 1}
                {/* 여기서 각 번호 아이템 사이에 점선 또는 실선을 추가합니다 */}
              </div>
            ))}
          </div>
          <div className={styles['imageSlider']}>
            {courseGroup.courseGroupList.map((group, index) => (
              <div
                key={group.course.courseSeq}
                className={`${styles['imageItem']} ${selectedIndex === index ? styles.Dactive : ''}`}
                onClick={() => handleImageClick(index)}
                data-title={group.course.title}
              >
                <img
                  key={index}
                  src={
                    group.course.courseList[0]?.place.imageFile1 ||
                    '/free-sticker-van-13719277.png'
                  }
                  alt={group.course.title}
                  onClick={() => handleImageClick(index)}
                  className={index === selectedIndex ? styles.Dactive : ''}
                />
              </div>
            ))}
          </div>
          {selectedCourse && (
            <div className={styles['detail-course-content-wrap']}>
              {/* <div
                ref={triangleRef}
                className={styles['select-course-triangle']}
              ></div> */}
              <div className={styles['select-course-content-box']}>
                <h3>{selectedCourse.title}</h3>
                <ul className={styles['select-course-titles']}>
                  {selectedCourse.courseList.map((item) => (
                    <li key={item.courseListSeq}>
                      <a href={`/places/${item.place.placeSeq}`}>
                        {item.place.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseGroupDetail;
