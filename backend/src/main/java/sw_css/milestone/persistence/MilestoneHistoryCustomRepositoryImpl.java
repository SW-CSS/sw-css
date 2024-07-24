package sw_css.milestone.persistence;

import static sw_css.member.domain.QMember.member;
import static sw_css.member.domain.QStudentMember.studentMember;
import static sw_css.milestone.domain.QMilestone.milestone;
import static sw_css.milestone.domain.QMilestoneHistory.milestoneHistory;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import sw_css.milestone.domain.MilestoneHistory;
import sw_css.milestone.domain.MilestoneHistorySearchField;
import sw_css.milestone.domain.MilestoneHistorySortCriteria;
import sw_css.milestone.domain.MilestoneStatus;
import sw_css.milestone.domain.repository.MilestoneHistoryCustomRepository;
import sw_css.milestone.persistence.dto.MilestoneHistoryWithStudentInfo;

@Repository
@AllArgsConstructor
public class MilestoneHistoryCustomRepositoryImpl implements MilestoneHistoryCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<MilestoneHistory> findMilestoneHistoriesByStudentId(final Long studentId,
                                                                    @Nullable final LocalDate startDate,
                                                                    @Nullable final LocalDate endDate,
                                                                    @Nullable final MilestoneStatus filter,
                                                                    @Nullable final MilestoneHistorySortCriteria sortBy,
                                                                    @Nullable final Sort.Direction sortDirection,
                                                                    final Pageable pageable) {
        BooleanExpression whereClause = milestoneHistory.studentId.eq(studentId)
                .and(milestoneHistory.isDeleted.eq(false));
        if (startDate != null && endDate != null) {
            whereClause = whereClause.and(milestoneHistory.activatedAt.between(startDate, endDate));
        }
        if (filter != null) {
            whereClause = whereClause.and(milestoneHistory.status.eq(filter));
        }

        final OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sortBy, sortDirection);

        final List<MilestoneHistory> histories = jpaQueryFactory.selectFrom(milestoneHistory)
                .where(whereClause)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        final Long count = jpaQueryFactory
                .select(milestoneHistory.count())
                .from(milestoneHistory)
                .where(whereClause)
                .fetchOne();
        return new PageImpl<>(histories, pageable, count);
    }

    private OrderSpecifier<?> getOrderSpecifier(MilestoneHistorySortCriteria sortBy, Sort.Direction direction) {
        Order order = direction == Sort.Direction.ASC ? Order.ASC : Order.DESC;

        if (sortBy == null) {
            return new OrderSpecifier<>(order, milestoneHistory.activatedAt);
        }

        switch (sortBy) {
            case ACTIVATED_AT:
                return new OrderSpecifier<>(order, milestoneHistory.activatedAt);
            case CREATED_AT:
                return new OrderSpecifier<>(order, milestoneHistory.createdAt);
            case STATUS:
                return new OrderSpecifier<>(order, milestoneHistory.status);
            default:
                return new OrderSpecifier<>(order, milestoneHistory.activatedAt);
        }
    }

    public Page<MilestoneHistoryWithStudentInfo> findMilestoneHistories(
            @Nullable final Integer field,
            @Nullable final String keyword,
            final Pageable pageable) {

        final BooleanBuilder booleanBuilder = getBooleanBuilder(field, keyword);

        List<MilestoneHistoryWithStudentInfo> histories = jpaQueryFactory
                .select(Projections.constructor(
                        MilestoneHistoryWithStudentInfo.class,
                        milestoneHistory.id,
                        milestone,
                        milestone.category,
                        milestoneHistory.studentId,
                        member.name,
                        milestoneHistory.description,
                        milestoneHistory.fileUrl,
                        milestoneHistory.status,
                        milestoneHistory.rejectReason,
                        milestoneHistory.count,
                        milestoneHistory.activatedAt,
                        milestoneHistory.createdAt
                ))
                .from(milestoneHistory)
                .leftJoin(milestoneHistory.milestone, milestone)
                .leftJoin(studentMember).on(milestoneHistory.studentId.eq(studentMember.id))
                .leftJoin(studentMember.member, member)
                .where(booleanBuilder)
                .orderBy(
                        Expressions.cases()
                                .when(milestoneHistory.status.eq(MilestoneStatus.PENDING))
                                .then(1)
                                .otherwise(0).desc(),
                        milestoneHistory.createdAt.desc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        final Long count = jpaQueryFactory
                .select(milestoneHistory.count())
                .from(milestoneHistory)
                .leftJoin(milestoneHistory.milestone, milestone)
                .leftJoin(studentMember).on(milestoneHistory.studentId.eq(studentMember.id))
                .leftJoin(studentMember.member, member)
                .where(booleanBuilder)
                .fetchOne();
        return new PageImpl<>(histories, pageable, count);
    }

    private static BooleanBuilder getBooleanBuilder(final Integer field, final String keyword) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(milestoneHistory.isDeleted.eq(false));
        if (field != null && keyword != null && !keyword.isEmpty()) {
            switch (MilestoneHistorySearchField.fromValue(field)) {
                case STUDENT_ID:
                    booleanBuilder.and(milestoneHistory.studentId.stringValue().like("%" + keyword + "%"));
                    break;
                case STUDENT_NAME:
                    booleanBuilder.and(studentMember.member.name.containsIgnoreCase(keyword));
                    break;
                case MILESTONE_NAME:
                    booleanBuilder.and(milestone.name.containsIgnoreCase(keyword));
                    break;
                case DESCRIPTION:
                    booleanBuilder.and(milestoneHistory.description.containsIgnoreCase(keyword));
                    break;
            }
        }
        return booleanBuilder;
    }
}
