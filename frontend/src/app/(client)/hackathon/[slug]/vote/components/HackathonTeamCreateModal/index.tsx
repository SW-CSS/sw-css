import ImageUploader from '@/components/common/formik/ImageUploader';
import TextInput from '@/components/common/formik/TextInput';
import PageTitle from '@/components/common/PageTitle';
import { TeamMemberRole } from '@/data/hackathon';
import { useRegisterTeamMutation } from '@/lib/hooks/useApi';
import useBodyScrollLock from '@/lib/hooks/useBodyScrollLock';
import useOnClickOutside from '@/lib/hooks/useOnClickOutside';
import { TeamMember } from '@/types/common.dto';
import { CgMathPlus } from '@react-icons/all-files/cg/CgMathPlus';
import { MdImage } from '@react-icons/all-files/md/MdImage';
import { MdLock } from '@react-icons/all-files/md/MdLock';
import { MdPerson } from '@react-icons/all-files/md/MdPerson';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import TeamMemberInput from '../TeamMemberInput';
import InputSection from '@/components/common/InputSection';

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required('섬네일 이미지를 첨부해주세요.')
    .test(
      'fileFormat',
      '이미지 파일(.jpg, .jpeg, .png)만 업로드 가능합니다.',
      (value) => value instanceof File && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type),
    ),
  name: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
  work: Yup.string().required('필수 입력란입니다. 서비스 이름을 입력해주세요.'),
  githubUrl: Yup.string().required('필수 입력란입니다. Github Repository url을 입력해주세요.'),
  leader: Yup.object().shape({
    id: Yup.string()
      .required('필수 입력란입니다.')
      .matches(/^[\d]{9}$/, '9자리의 학번을 입력해주세요.'),
  }),
  members: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string()
          .required('필수 입력란입니다.')
          .matches(/^[\d]{9}$/, '9자리의 학번을 입력해주세요.'),
      }),
    )
    .test('unique-student-number', '같은 팀원을 2번 이상 등록할 수 없습니다.', function (members) {
      const memberIds = members?.map((member) => member.id) || [];
      const allIds = [this.parent.leader.id, ...memberIds];
      const uniqueMemberIds = new Set(allIds);
      return uniqueMemberIds.size === allIds.length;
    }),
  password: Yup.string().required('필수 입력란입니다. 팀 등록 코드(비밀번호)를 입력해주세요.'),
});

interface HackathonTeamFormProps {
  image: File | null;
  name: string;
  work: string;
  githubUrl: string;
  leader: TeamMember;
  members: TeamMember[];
  password: string;
}

const initialValues: HackathonTeamFormProps = {
  image: null,
  name: '',
  work: '',
  githubUrl: '',
  leader: { id: null, role: TeamMemberRole.DEVELOPER, isLeader: true },
  members: [],
  password: '',
};

interface HackathonTeamCreateModalProps {
  hackathonId: number;
  open: boolean;
  onClose: () => void;
}

const HackathonTeamCreateModal = ({ hackathonId, open, onClose }: HackathonTeamCreateModalProps) => {
  const { mutate: registerTeam } = useRegisterTeamMutation();
  const ref = useRef<HTMLDivElement>(null);
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const router = useRouter();

  useOnClickOutside(ref, onClose);

  useEffect(() => {
    if (open) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [open, lockScroll, unlockScroll]);
  if (!open) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-[51] flex items-center justify-center bg-black bg-opacity-30">
      <div ref={ref} className="flex w-full max-w-[900px] flex-col items-center gap-5 rounded bg-white p-5">
        <div className="flex w-full justify-between">
          <PageTitle title="팀 등록하기" />
          <button onClick={onClose} className="text-comment">
            <VscClose className="h-8 w-8" />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            registerTeam(
              {
                hackathonId: hackathonId,
                thumbnailImage: values.image,
                teamName: values.name,
                projectTitle: values.work,
                githubUrl: values.githubUrl,
                members: [values.leader, ...values.members],
                password: values.password,
              },
              {
                onSuccess: () => {
                  toast.info('팀 등록에 성공하였습니다.');
                  router.refresh();
                },
                onError: () => {
                  toast.error('팀 등록에 실패하였습니다.');
                },
              },
            );
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, touched, values, handleBlur, handleChange, setFieldValue, errors }) => (
            <Form className="flex max-h-[462px] w-full flex-col gap-5 overflow-auto px-10">
              <InputSection
                icon={MdImage}
                label="대표 이미지"
                inputElement={
                  <div className="mx-auto h-[120px] w-[210px] md:m-0">
                    <ImageUploader
                      name="image"
                      image={values.image}
                      setFieldValue={setFieldValue}
                      errorText={touched.image && errors.image ? errors.image : undefined}
                    />
                  </div>
                }
              />
              <InputSection
                icon={MdTextFields}
                label="팀 이름"
                inputElement={
                  <TextInput
                    name="name"
                    label=""
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.name && errors.name ? errors.name : undefined}
                    placeholder="팀 이름을 입력해주세요."
                  />
                }
              />
              <InputSection
                icon={MdTextFields}
                label="서비스 이름"
                inputElement={
                  <TextInput
                    name="work"
                    label=""
                    type="text"
                    value={values.work}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.work && errors.work ? errors.work : undefined}
                    placeholder="서비스 이름을 입력해주세요."
                  />
                }
              />

              <InputSection
                icon={VscGithubInverted}
                label="Github URL"
                inputElement={
                  <TextInput
                    name="githubUrl"
                    label=""
                    type="text"
                    value={values.githubUrl}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.githubUrl && errors.githubUrl ? errors.githubUrl : undefined}
                    placeholder="Github Repository의 Url을 입력해주세요."
                  />
                }
              />
              <InputSection
                icon={MdPerson}
                label="팀원 구성"
                inputElement={
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <p className="h-full w-[2em] shrink-0 font-bold md:pt-[10px]">팀장</p>
                      <div className="grid flex-grow grid-cols-[3fr_2fr] gap-2 sm:grid-cols-[3fr_2fr_2fr] md:grid-cols-[3fr_2fr_3fr_2fr]">
                        <TeamMemberInput
                          fieldName="leader"
                          student={values.leader}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorText={
                            (touched.leader?.id && errors.leader?.id ? errors.leader?.id : undefined) ||
                            (touched.members && errors.members && typeof errors.members === 'string'
                              ? errors.members
                              : undefined)
                          }
                          setFieldValue={setFieldValue}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <p className="h-full w-[2em] shrink-0 pt-[10px] font-bold">팀원</p>
                      <div className="flex w-full flex-col gap-2">
                        {values.members.map((_, index) => (
                          <div
                            key={index}
                            className="grid flex-grow grid-cols-[3fr_2fr] gap-2 sm:grid-cols-[3fr_2fr_2fr_1fr] md:grid-cols-[3fr_2fr_3fr_2fr_1fr]"
                          >
                            <TeamMemberInput
                              fieldName={`members[${index}]`}
                              student={values.members[index]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              errorText={
                                (touched.members?.[index]?.id &&
                                errors.members?.[index] &&
                                typeof errors.members[index] === 'object'
                                  ? (errors.members?.[index] as { id: string }).id
                                  : undefined) ||
                                (touched.members && errors.members && typeof errors.members === 'string'
                                  ? errors.members
                                  : undefined)
                              }
                              setFieldValue={setFieldValue}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                values.members.splice(index, 1);
                                setFieldValue('members', values.members);
                              }}
                              className="flex h-[44px] w-[44px] flex-1 items-center justify-center rounded-full border border-border text-comment transition-colors hover:bg-red-50"
                            >
                              <VscClose className="h-6 w-6 text-red-300" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue('members', [
                              ...values.members,
                              { id: '', role: TeamMemberRole.DEVELOPER, isLeader: false },
                            ]);
                          }}
                          className="flex flex-1 justify-center rounded-sm border border-border p-[11px] text-comment transition-colors hover:bg-background-light"
                        >
                          <CgMathPlus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />
              <InputSection
                icon={MdLock}
                label="팀 등록 코드"
                inputElement={
                  <TextInput
                    name="password"
                    label=""
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorText={touched.password && errors.password ? errors.password : undefined}
                    placeholder="사전에 고지된 팀 등록 코드(비밀번호)를 입력해주세요."
                    autoComplete="new-password"
                  />
                }
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-primary-main px-4 py-2 font-bold text-white transition-colors hover:bg-primary-dark"
                  disabled={isSubmitting}
                >
                  등록하기
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HackathonTeamCreateModal;
