package sw_css.member.persistence;

import static sw_css.member.domain.QFacultyMember.facultyMember;
import static sw_css.member.domain.QMember.member;
import static sw_css.member.domain.QStudentMember.studentMember;
import static sw_css.milestone.domain.QMilestone.milestone;
import static sw_css.milestone.domain.QMilestoneHistory.milestoneHistory;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import sw_css.member.domain.FacultyMember;
import sw_css.member.domain.FacultySearchField;
import sw_css.member.domain.repository.FacultyMemberCustomRepository;
import sw_css.milestone.domain.MilestoneHistorySearchField;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

@Repository
@AllArgsConstructor
public class FacultyMemberCustomRepositoryImpl implements FacultyMemberCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<FacultyMember> findFacultyMembers(@Nullable final Integer field,
                                                  @Nullable final String keyword,
                                                  final Pageable pageable) {
        final BooleanBuilder booleanBuilder = getBooleanBuilder(field, keyword);

        List<FacultyMember> facultyMembers = jpaQueryFactory
                .selectFrom(facultyMember)
                .join(facultyMember.member, member)
                .where(booleanBuilder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        final Long count = jpaQueryFactory
                .select(facultyMember.count())
                .from(facultyMember)
                .where(booleanBuilder)
                .fetchOne();

        return new PageImpl<>(facultyMembers, pageable, count);
    }

    private static BooleanBuilder getBooleanBuilder(final Integer field, final String keyword) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(facultyMember.member.isDeleted.eq(false));
        if (field != null && keyword != null && !keyword.isEmpty()) {
            switch (FacultySearchField.fromValue(field)) {
                case FACULTY_ID:
                    booleanBuilder.and(facultyMember.id.stringValue().like("%" + keyword + "%"));
                    break;
                case MEMBER_NAME:
                    booleanBuilder.and(facultyMember.member.name.containsIgnoreCase(keyword));
                    break;
                case MEMBER_EMAIL:
                    booleanBuilder.and(facultyMember.member.email.containsIgnoreCase(keyword));
                    break;
            }
        }
        return booleanBuilder;
    }
}
