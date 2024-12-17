'use client';

import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import TextInput from '@/components/common/formik/TextInput';
import ActionModal from '@/components/common/modal/ActionModal';
import ImageUploader from '@/components/common/formik/ImageUploader';
import HackathonTeamMemberInput from '@/components/ui/hackathon/HackathonTeamMemberInput';
import HackathonTeamInputSection from '@/components/ui/hackathon/HackathonTeamInputSection';

import { useRegisterTeamMutation } from '@/lib/hooks/useApi';
import { TeamMemberRole } from '@/data/hackathon';
import { HackathonTeamCreateDto, TeamMember } from '@/types/common.dto';

import { MdLock } from '@react-icons/all-files/md/MdLock';
import { MdImage } from '@react-icons/all-files/md/MdImage';
import { MdPerson } from '@react-icons/all-files/md/MdPerson';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { CgMathPlus } from '@react-icons/all-files/cg/CgMathPlus';
import { MdTextFields } from '@react-icons/all-files/md/MdTextFields';
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted';

type HackathonCreateTeamFormProps = Omit<HackathonTeamCreateDto, 'hackathonId'> & { leader: TeamMember };

interface HackathonTeamCreateModalProps {
  hackathonId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function HackathonTeamCreateModal({ hackathonId, isOpen, onClose }: HackathonTeamCreateModalProps) {
  const { mutate: registerTeam } = useRegisterTeamMutation();
  const router = useRouter();

  function handleCreateTeamButtonClick(values: HackathonCreateTeamFormProps) {
    registerTeam(
      {
        hackathonId: hackathonId,
        thumbnailImage: values.thumbnailImage,
        teamName: values.teamName,
        projectTitle: values.projectTitle,
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
  }

  return (
    <ActionModal isOpen={isOpen} size="lg" title="팀 등록하기" onClose={onClose}>
      <Formik
        initialValues={initialHackathonTeamCreateValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateTeamButtonClick(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, touched, values, handleBlur, handleChange, setFieldValue, errors }) => (
          <Form className="flex max-h-[462px] w-full flex-col gap-5 overflow-auto px-10">
            <HackathonTeamInputSection
              icon={MdImage}
              label="대표 이미지"
              inputElement={
                <div className="mx-auto h-[120px] w-[210px] md:m-0">
                  <ImageUploader
                    name="thumbnailImage"
                    image={values.thumbnailImage}
                    setFieldValue={setFieldValue}
                    errorText={touched.thumbnailImage && errors.thumbnailImage ? errors.thumbnailImage : undefined}
                  />
                </div>
              }
            />
            <HackathonTeamInputSection
              icon={MdTextFields}
              label="팀 이름"
              inputElement={
                <TextInput
                  name="teamName"
                  value={values.teamName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.teamName && errors.teamName ? errors.teamName : undefined}
                  placeholder="팀 이름을 입력해주세요."
                />
              }
            />
            <HackathonTeamInputSection
              icon={MdTextFields}
              label="서비스 이름"
              inputElement={
                <TextInput
                  name="projectTitle"
                  value={values.projectTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorText={touched.projectTitle && errors.projectTitle ? errors.projectTitle : undefined}
                  placeholder="서비스 이름을 입력해주세요."
                />
              }
            />

            <HackathonTeamInputSection
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
            <HackathonTeamInputSection
              icon={MdPerson}
              label="팀원 구성"
              inputElement={
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <p className="h-full w-[2em] shrink-0 font-bold md:pt-[10px]">팀장</p>
                    <div className="grid flex-grow grid-cols-[3fr_2fr] gap-2 sm:grid-cols-[3fr_2fr_2fr] md:grid-cols-[3fr_2fr_3fr_2fr]">
                      <HackathonTeamMemberInput
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
                          <HackathonTeamMemberInput
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
            <HackathonTeamInputSection
              icon={MdLock}
              label="팀 등록 코드"
              inputElement={
                <TextInput
                  name="password"
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
    </ActionModal>
  );
}

const validationSchema = Yup.object().shape({
  thumbnailImage: Yup.mixed()
    .required('섬네일 이미지를 첨부해주세요.')
    .test(
      'fileFormat',
      '이미지 파일(.jpg, .jpeg, .png)만 업로드 가능합니다.',
      (value) => value instanceof File && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type),
    ),
  teamName: Yup.string().required('필수 입력란입니다. 이름을 입력해주세요.'),
  projectTitle: Yup.string().required('필수 입력란입니다. 서비스 이름을 입력해주세요.'),
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

const initialHackathonTeamCreateValues: HackathonCreateTeamFormProps = {
  thumbnailImage: null,
  teamName: '',
  projectTitle: '',
  githubUrl: '',
  leader: { id: null, role: TeamMemberRole.DEVELOPER, isLeader: true },
  members: [],
  password: '',
};
