"""add bookclub:


Revision ID: d54b13df587e
Revises: 6e91da85743f
Create Date: 2023-12-12 17:55:17.595454

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd54b13df587e'
down_revision = '6e91da85743f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookclubs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('club_name', sa.String(), nullable=True),
    sa.Column('picture', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bookclub_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_users_bookclub_id_bookclubs'), 'bookclubs', ['bookclub_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_users_bookclub_id_bookclubs'), type_='foreignkey')
        batch_op.drop_column('bookclub_id')

    op.drop_table('bookclubs')
    # ### end Alembic commands ###
